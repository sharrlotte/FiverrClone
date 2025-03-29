'use client';

import { getSkillCategoryById } from '@/api/skill-category.api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: number;
};
export default function SkillCategoryNameById({ id }: Props) {
  const { data, isError, error } = useQuery({
    queryKey: ['skill-category', id],
    queryFn: () => getSkillCategoryById(id),
  });

  if (isError || error) {
    return error.message;
  }

  return data?.name;
}
