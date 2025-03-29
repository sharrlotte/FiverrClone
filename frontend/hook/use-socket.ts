import { socket } from '@/api/socket';
import { useSession } from '@/context/SessionContext';
import { ChatMessage } from '@/schema/chat.schema';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export default function useSocket(targetId: number) {
  const session = useSession();
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (session && !isConnected) {
      socket.connect();
    }
  }, [isConnected, session]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const addNewMessage = useCallback(
    (message: ChatMessage) => {
      queryClient.setQueriesData<InfiniteData<ChatMessage[], unknown> | undefined>({ queryKey: ['messages', targetId], exact: false }, (query) => {
        if (!message || !query || !query.pages) {
          return query;
        }

        let found = false;

        const newPages =
          message.cId && message.userId === session.session?.id
            ? query.pages.map((page) => [
                ...page.map((m) => {
                  if (m.cId === message.cId) {
                    found = true;
                  }

                  return { ...m, cId: undefined };
                }),
              ])
            : query.pages;

        if (found) {
          return {
            ...query,
            pages: [...newPages],
          } satisfies InfiniteData<ChatMessage[], unknown>;
        }

        const [first, ...rest] = newPages;
        const newFirst = [message, ...first];

        return {
          ...query,
          pages: [newFirst, ...rest],
        } satisfies InfiniteData<ChatMessage[], unknown>;
      });
    },
    [queryClient, targetId],
  );

  return { isConnected, addNewMessage };
}
