'use client';

import { getPostCategoryById } from '@/api/post-category.api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number;
};
export default function PostCategoryNameById({ id }: Props) {
  const { data, isError, error } = useQuery({
    queryKey: ['post-category', id],
    queryFn: () => getPostCategoryById(id),
  });

  if (isError || error) {
    return error.message;
  }

  return data?.name;
}
