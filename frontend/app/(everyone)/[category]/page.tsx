import { getPostCategoryById } from '@/api/post-category.api';
import InvalidCategoryPage from '@/app/(everyone)/[category]/InvalidCategoryPage';
import PageClient from '@/app/(everyone)/[category]/page.client';
import React from 'react';

type Props = {
  params: {
    category: string;
  };
};

export default async function Page({ params: { category } }: Props) {
  try {
    const categoryId = parseInt(category);

    const data = await getPostCategoryById(categoryId);

    return <PageClient category={data} />;
  } catch {
    return <InvalidCategoryPage />;
  }
}
