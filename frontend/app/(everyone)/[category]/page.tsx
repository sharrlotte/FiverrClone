import InvalidCategoryPage from '@/app/(everyone)/[category]/InvalidCategoryPage';
import PageClient from '@/app/(everyone)/[category]/page.client';
import React from 'react';

type Props = {
  params: {
    category: string;
  };
};

export default function Page({ params: { category } }: Props) {
  try {
    const categoryId = parseInt(category);

    return <PageClient categoryId={categoryId} />;
  } catch {
    return <InvalidCategoryPage />;
  }
}
