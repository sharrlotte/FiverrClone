'use client';

import { BoldIcon, CheckListIcon, CodeBlockIcon, EditPanelIcon, FullScreenIcon, HRIcon, ImageIcon, ItalicIcon, LinkChainIcon, ListIcon, LivePanelIcon, OrderedListIcon, PreviewPanelIcon, QuoteIcon, StrikethroughIcon, TitleIcon } from '@/components/ui/icon/icons';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Markdown from '@/components/ui/markdown';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export type MarkdownData = {
  text: string;
  images: Array<{
    url: string;
    file: File;
  }>;
};

type MarkdownEditorProps = {
  value: MarkdownData;
  onChange: (value: MarkdownData) => void;
};

type EditorMode = 'edit' | 'preview' | 'live';

export default function Page() {
  const [content, setContent] = useState<MarkdownData>({
    images: [],
    text: '',
  });
  return <MarkdownEditor value={content} onChange={setContent} />;
}

function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [content, setContent] = useState(value);
  const [mode, setMode] = useState<EditorMode>('live');
  const [isFullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => setFullscreen((prev) => !prev);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => onChange(content), [content, onChange]);

  function insertAtCaret(content: string) {
    const input = inputRef.current;

    if (!input) return;

    const position = input.selectionStart ?? input.value.length;

    setContent(({ text, images }) => ({
      text: text.substring(0, position) + content + text.substring(position),
      images,
    }));
    const newPosition = position + content.length;
    input.focus();
    setTimeout(() => input.setSelectionRange(newPosition, newPosition));
  }

  function wrapAtCaret(before: string, after: string) {
    const input = inputRef.current;

    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (end && start !== end) {
      setContent(({ text, images }) => ({
        text: text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end),
        images,
      }));

      input.focus();

      setTimeout(() => input.setSelectionRange(start + before.length, end + after.length));
    } else {
      const position = end ? end : input.value.length;

      setContent(({ text, images }) => ({
        text: text.substring(0, position) + before + after + text.substring(position),
        images,
      }));

      let newPosition = position + before.length;
      newPosition = newPosition > 0 ? Math.round(newPosition) : 0;
      input.focus();
      setTimeout(() => input.setSelectionRange(newPosition, newPosition));
    }
  }

  function handleInputScroll() {
    const preview = previewRef.current;
    const input = inputRef.current;

    if (preview && input) {
      const percent = (input.scrollTop + document.body.scrollTop) / (input.scrollHeight - input.clientHeight);

      preview.scrollTop = percent * (preview.scrollHeight - preview.clientHeight) - document.body.scrollTop;
    }
  }

  function handlePreviewScroll() {
    const preview = previewRef.current;
    const input = inputRef.current;

    if (preview && input) {
      const percent = (preview.scrollTop + document.body.scrollTop) / (preview.scrollHeight - preview.clientHeight);

      input.scrollTop = percent * (input.scrollHeight - input.clientHeight) - document.body.scrollTop;
    }
  }

  return (
    <div
      className={cn('flex h-full w-full flex-col divide-y overflow-hidden rounded-md border bg-background', {
        'fixed inset-0 z-50 rounded-none': isFullscreen,
      })}
    >
      <section className="flex divide-x">
        <div>
          <Button className="w-5 p-1" size="icon" title={'bold'} variant="outline" type="button" onClick={() => wrapAtCaret('**', '**')}>
            <BoldIcon className="h-3 w-3" />
          </Button>
          <Button className="w-5 p-1" size="icon" title={'italic'} variant="outline" onClick={() => wrapAtCaret('*', '*')}>
            <ItalicIcon className="h-3 w-3" />
          </Button>
          <Button className="w-5 p-1" size="icon" title={'strikethrough'} variant="outline" onClick={() => wrapAtCaret('~~', '~~')}>
            <StrikethroughIcon className="h-3 w-3" />
          </Button>
          <Button className="w-5 p-1" size="icon" title={'strikethrough'} variant="outline" onClick={() => insertAtCaret('\n----------\n')}>
            <HRIcon className="h-3 w-3" />
          </Button>
          <Button className="p-1" size="icon" title={'header'} variant="outline" onClick={() => wrapAtCaret('# ', ' \n')}>
            <TitleIcon className="h-3 w-3" />
          </Button>
        </div>
        <div>
          <LinkDialog onAccept={insertAtCaret}>
            <LinkChainIcon className="h-3 w-3" />
          </LinkDialog>
          <Button className="p-1" size="icon" title={'quote'} variant="outline" onClick={() => insertAtCaret('> ')}>
            <QuoteIcon className="h-3 w-3" />
          </Button>
          <Button className="w-5 p-1" size="icon" title={'code-block'} variant="outline" onClick={() => wrapAtCaret('`', '`')}>
            <CodeBlockIcon className="h-3 w-3" />
          </Button>
          <ImageDialog
            onAccept={(value, image) => {
              insertAtCaret(value);
              if (image) {
                setContent((prev) => ({
                  ...prev,
                  images: [...prev.images, image],
                }));
              }
            }}
          >
            <ImageIcon className="h-3 w-3" />
          </ImageDialog>
        </div>
        <div>
          <Button className="p-1" size="icon" title={'list'} variant="outline" onClick={() => insertAtCaret('- ')}>
            <ListIcon className="h-3 w-3" />
          </Button>
          <Button className="p-1" size="icon" title={'ordered-list'} variant="outline" onClick={() => insertAtCaret('1. ')}>
            <OrderedListIcon className="h-3 w-3" />
          </Button>
          <Button className="p-1" size="icon" title={'check-list'} variant="outline" onClick={() => insertAtCaret('- [] ')}>
            <CheckListIcon className="h-3 w-3" />
          </Button>
        </div>
        <div className="ml-auto flex divide-x">
          <div>
            <Button className="p-1" size="icon" disabled={mode === 'edit'} title={'edit-mode'} variant="outline" onClick={() => setMode('edit')}>
              <EditPanelIcon className="h-3 w-3" />
            </Button>
            <Button className="p-1" disabled={mode === 'live'} size="icon" title={'live-mode'} variant="outline" onClick={() => setMode('live')}>
              <LivePanelIcon className="h-3 w-3" />
            </Button>
            <Button className="p-1" disabled={mode === 'preview'} size="icon" title={'preview-mode'} variant="outline" onClick={() => setMode('preview')}>
              <PreviewPanelIcon className="h-3 w-3" />
            </Button>
          </div>
          <div className="px-1">
            <Button className="p-1" size="icon" title={'fullscreen'} variant="outline" onClick={toggleFullscreen}>
              <FullScreenIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </section>
      <div
        className={cn('grid h-full w-full grid-cols-1 divide-y overflow-hidden bg-background md:divide-x md:divide-y-0', {
          'grid-rows-2 md:grid-cols-2 md:grid-rows-1': mode === 'live',
        })}
      >
        {(mode === 'edit' || mode === 'live') && (
          <textarea
            className="h-full w-full resize-none overflow-y-auto border-none bg-transparent p-2 outline-none "
            ref={inputRef}
            title={'content'}
            value={content.text}
            spellCheck="false"
            onScroll={handleInputScroll}
            onChange={(event) =>
              setContent(({ images }) => ({
                text: event.target.value,
                images,
              }))
            }
          />
        )}
        {(mode === 'preview' || mode === 'live') && (
          <div className="h-full w-full overflow-y-auto p-2" ref={previewRef} onScroll={handlePreviewScroll}>
            <Markdown>{content.text}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

type LinkDialogProps = {
  children: ReactNode;
  onAccept: (value: string) => void;
};

function LinkDialog({ children, onAccept }: LinkDialogProps) {
  const [open, setOpen] = useState(false);

  function handleAccept({ header, url }: z.infer<typeof FormSchema>) {
    setOpen(false);
    onAccept(`[${header}](${url})`);
    form.reset();
  }

  const FormSchema = z.object({
    header: z.string(),
    url: z.string().url(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      header: '',
      url: '',
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-5 p-1" size="icon" title={'add-link'} variant="outline">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{'add-link'}</DialogTitle>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(handleAccept)}>
            <FormField
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'url-header'}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'url-header'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'url'}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'url'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="ml-auto" title={'submit'} type="submit" variant="outline">
                {'submit'}
              </Button>
            </div>
          </form>
        </Form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

type ImageDialogProps = {
  children: ReactNode;
  onAccept: (value: string, image?: { file: File; url: string }) => void;
};

function ImageDialog({ children, onAccept }: ImageDialogProps) {
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState(false);

  function handleAccept({ header, image }: z.infer<typeof FormSchema>) {
    setOpen(false);

    if (file) {
      onAccept(`![${header}](${image})`, { file, url: image });
    } else {
      onAccept(`![${header}](${image})`);
    }

    form.reset();
  }

  const FormSchema = z.object({
    header: z.string(),
    image: z.string().url(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      header: '',
      image: '',
    },
  });

  function handleFilePick(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file).replace('blob:', '');

    setFile(file);

    form.setValue('image', url);
  }

  const imageUrl = form.getValues('image') && 'blob:' + form.getValues('image');
  const hasImage = URL.canParse(imageUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-5 p-1" size="icon" title={'add-image'} variant="outline">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{'add-image'}</DialogTitle>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(handleAccept)}>
            <FormField
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'url-header'}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'url-header'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{'image'}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder={'url'} />
                      <label className="flex h-9 items-center justify-center rounded-md border p-2" htmlFor="image" hidden>
                        <ImageIcon className="h-5 w-5" />
                      </label>
                      <input id="image" className="w-16" hidden accept=".png, .jpg" type="file" onChange={handleFilePick} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {hasImage && (
              <div className="relative">
                <Button className="absolute right-0 top-0" title={'delete'} size="icon" variant="outline" onClick={() => form.reset({ image: undefined })}>
                  <XMarkIcon className="h-4 w-4" />
                </Button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="preview" />
              </div>
            )}
            <div className="flex justify-end">
              <Button className="ml-auto" title={'submit'} type="submit" variant="outline">
                {'submit'}
              </Button>
            </div>
          </form>
        </Form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
