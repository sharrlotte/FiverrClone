import { getPostCategoryById } from '@/api/post-category.api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number;
};
export default function PostCategoryNameById({ id }: Props) {
  const { data } = useQuery({
    queryKey: ['post-category', id],
    queryFn: () => getPostCategoryById(id),
  });

  return data?.name;
}
