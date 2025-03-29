'use client';

import 'moment/locale/vi';
import { LogIn, Send } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChatMessages, sendMessage } from '@/api/chat.api';
import { ChatMessage, MessageGroup } from '@/schema/chat.schema';
import { useInterval } from 'usehooks-ts';
import Loading from '@/app/loading';
import { UserProfile } from '@/schema/user.schema';

import Moment from 'react-moment';
import { socket } from '@/api/socket';
import useSocket from '@/hook/use-socket';
import { useSession } from '@/context/SessionContext';
import { getUser } from '@/api/user.api';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

type ChatProps = {
  user: Pick<UserProfile, 'username' | 'avatar' | 'id' | 'welcomeMessage'>;
};

export function CardsChat({ user }: ChatProps) {
  const { session } = useSession();
  const { username, avatar, id, welcomeMessage } = user;
  const [input, setInput] = useState('');
  const inputLength = input.trim().length;
  const { addNewMessage } = useSocket(id);

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-2 h-full border-b w-full pb-6">
            <Avatar>
              <AvatarImage className="rounded-full size-10" src={avatar + '.png'} alt="@shadcn" />
              <AvatarFallback className="rounded-full size-10">{username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium leading-none">{username}</p>
            </div>
            <span>{welcomeMessage}</span>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild></TooltipTrigger>
              <TooltipContent sideOffset={10}>Tin nhắn mới</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="flex flex-1 overflow-hidden w-full h-full">
          <MessageList id={id} />
        </CardContent>
        <CardFooter className="mt-auto">
          {session ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (inputLength === 0) return;

                const newMessage = {
                  id: Date.now(),
                  cId: Date.now() + '',
                  content: input,
                  createdAt: new Date() + '',
                  userId: session?.id || 0,
                };
                addNewMessage(newMessage);
                sendMessage({ ...newMessage, userId: id });
                setInput('');
              }}
              className="flex w-full items-center space-x-2"
            >
              <div className="flex w-full gap-2">
                <Input id="message" placeholder="" autoComplete="off" value={input} onChange={(event) => setInput(event.target.value)} />
                <Button className="gap-2" type="submit" disabled={inputLength === 0}>
                  <Send className="size-5 min-w-5" />
                  <span>Gửi</span>
                </Button>
              </div>
            </form>
          ) : (
            <Link className="flex justify-center items-center gap-1" href="/account/login">
              <LogIn />
              Đăng nhập
            </Link>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

type MessageListProps = {
  id: number;
};

function MessageList({ id }: MessageListProps) {
  const targetId = id;

  const [currentContainer, setCurrentContainer] = useState<HTMLDivElement | null>(null);
  const [list, setList] = useState<HTMLDivElement | null>(null);

  const scrollTopRef = useRef(0);
  const lastHeightRef = useRef(0);

  const queryClient = useQueryClient();
  const isEndReached = isReachedEnd(currentContainer, 300);

  const [shouldCheck, setShouldCheck] = useState(true);

  const clientHeight = list?.clientHeight || 0;
  const lastHeight = lastHeightRef.current || 0;
  const scrollTop = scrollTopRef.current || 0;

  const { addNewMessage, isConnected } = useSocket(targetId);

  if (clientHeight != lastHeight && currentContainer && list && !isEndReached) {
    const diff = clientHeight - lastHeight + scrollTop;

    currentContainer.scrollTo({
      top: diff,
    });
  }

  lastHeightRef.current = clientHeight;

  const { data, isFetching, error, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['messages', targetId],
    initialPageParam: {},
    queryFn: (context: any) => getChatMessages({ targetId, cursor: context.pageParam.cursor, limit: 20 }),
    getNextPageParam: (lastPage: any[], allPages: any[][], lastPageParams: any) => {
      if (!lastPage || lastPage.length === 0 || lastPage.length < 20 || !allPages || allPages.length === 0) {
        return undefined;
      }

      const last = lastPage.at(-1);

      if (!last) {
        return undefined;
      }

      return { ...lastPageParams, cursor: last.id ?? null };
    },
    getPreviousPageParam: (lastPage: ChatMessage[], allPages: ChatMessage[][], lastPageParams: any) => {
      if (lastPage.length === 0 || lastPage.length < 20 || allPages.length === 0) {
        return undefined;
      }

      return { ...lastPageParams, cursor: allPages[0][0].id };
    },
  });

  const pages = useMemo(() => {
    if (!data) {
      return [];
    }

    const array = mergeNestArray(data.pages);
    const group = groupMessage(array);

    return group;
  }, [data]);

  const checkIfNeedFetchMore = useCallback(() => {
    if (!shouldCheck) return;

    const handleEndReach = () => {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    };

    if (currentContainer) {
      if (currentContainer.scrollTop <= 300) {
        handleEndReach();
      }
    }
  }, [currentContainer, fetchNextPage, hasNextPage, isFetching, shouldCheck]);

  useEffect(() => {
    if (currentContainer && isEndReached) {
      currentContainer.scrollTo({
        top: currentContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentContainer, pages, isEndReached]);

  useEffect(() => {
    socket.on('message', addNewMessage);

    if (currentContainer && isEndReached) {
      currentContainer.scrollTo({
        top: currentContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
    return () => {
      socket.off('message', addNewMessage);
    };
  }, [addNewMessage, currentContainer, isEndReached]);

  useEffect(() => {
    function onScroll() {
      setShouldCheck(true);
      checkIfNeedFetchMore();

      if (currentContainer) {
        scrollTopRef.current = currentContainer.scrollTop;
      }
    }

    currentContainer?.addEventListener('scrollend', onScroll);
    currentContainer?.addEventListener('scroll', onScroll);

    list?.addEventListener('scroll', checkIfNeedFetchMore);

    return () => {
      currentContainer?.removeEventListener('scrollend', onScroll);
      currentContainer?.removeEventListener('scroll', onScroll);

      list?.removeEventListener('scroll', checkIfNeedFetchMore);
    };
  }, [checkIfNeedFetchMore, currentContainer, list, scrollTopRef]);

  useInterval(checkIfNeedFetchMore, 100);

  if (isError) {
    return (
      <div className="col-span-full flex w-full items-center justify-center flex-col">
        {error?.message}
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['messages'], exact: false })}>Tải lại</Button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className={cn('col-span-full flex h-full w-full items-center justify-center')}>
        <Loading />
      </div>
    );
  }

  if (!pages || pages.length === 0) {
    return '';
  }

  return (
    <div className="h-full overflow-y-auto w-full pr-2" ref={(ref) => setCurrentContainer(ref)}>
      <div className="h-fit w-full space-y-2" ref={(ref) => setList(ref)}>
        {(!isConnected || isFetching) && (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}
        {pages.map((page) => (
          <MessageCard key={page.id} message={page} />
        ))}
      </div>
    </div>
  );
}

export function isReachedEnd(element?: HTMLElement | null, offset: number = 100) {
  if (!element) return false;

  return Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight)) <= offset;
}

export function mergeNestArray<T>(size: T[][]) {
  return size.reduce((prev, curr) => prev.concat(curr), []);
}

export function groupMessage(messages: ChatMessage[]): MessageGroup[] {
  const result: MessageGroup[] = [];

  for (const message of messages) {
    if (result.length === 0) {
      result.push({
        id: message.id,
        userId: message.userId,
        contents: [{ content: message.content, cId: message.cId }],
        createdAt: message.createdAt,
      });
      continue;
    }

    const lastGroup = result[0];

    const messageCreatedAt = new Date(message.createdAt);
    const groupCreatedAt = new Date(lastGroup.createdAt);

    if (message.userId === lastGroup.userId && Math.abs(messageCreatedAt.getTime() - groupCreatedAt.getTime()) < 1000 * 60 * 5 && isSameDay(messageCreatedAt, groupCreatedAt)) {
      lastGroup.contents.unshift({ content: message.content, cId: message.cId });
    } else {
      result.unshift({
        id: message.id,
        userId: message.userId,
        contents: [{ content: message.content, cId: message.cId }],
        createdAt: message.createdAt,
      });
    }
  }

  return result;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

type Props = {
  className?: string;
  message: MessageGroup;
};

export function MessageCard({ className, message }: Props) {
  const { contents, createdAt, userId } = message;
  const { session } = useSession();

  const isMyMessage = session?.id === userId;

  const { data } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
  });

  return (
    <div className={cn('flex w-full gap-2 text-wrap rounded-lg', { 'justify-end': isMyMessage }, className)}>
      {!isMyMessage ? (
        data ? (
          <Avatar>
            <AvatarImage className="rounded-full size-10" src={data.avatar + '.png'} alt="@shadcn" />
            <AvatarFallback className="rounded-full size-10">{data.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="flex size-10 min-h-10 min-w-10 items-center justify-center rounded-full border border-border capitalize" />
        )
      ) : undefined}
      <div className="overflow-hidden">
        <div className="flex gap-2">
          {isMyMessage ? undefined : data ? data.username : <Skeleton className="h-4 max-h-1 w-24" />}
          <RelativeTime className="text-sm" date={new Date(createdAt)} />
        </div>
        <div className={cn('no-scrollbar flex flex-col rounded-3xl overflow-hidden gap-0.5', { 'items-end': isMyMessage })}>
          {contents.map(({ content, cId }, index) => (
            <span className={cn('overflow-hidden break-words py-2 px-4 bg-slate-400 rounded-r-3xl rounded-l-md text-background', { 'opacity-50': !!cId, 'items-end text-end rounded-l-3xl rounded-r-md': isMyMessage })} key={index}>
              {content}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
type RelativeTimeProps = {
  className?: string;
  date: Date;
};

export function RelativeTime({ className, date }: RelativeTimeProps) {
  return (
    <Moment className={className} locale="vi" fromNow>
      {date}
    </Moment>
  );
}
