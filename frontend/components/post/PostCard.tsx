import { Post } from '@/api/post.apit';
import Image from 'next/image';
import React from 'react';

type Props = {
  post: Post;
};

export default function PostCard({ post: { title, thumbnail } }: Props) {
  return (
    <div className="border rounded-md p-4">
      <Image className='aspect-square object-cover' width={200} height={200} src={thumbnail} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
