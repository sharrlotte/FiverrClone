import { visitPost } from '@/api/post.api';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: Props) {
  visitPost(+id);

  return <div>{id}</div>;
}
