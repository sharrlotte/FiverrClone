return result.map(({ postImages, ...data }: { postImages: any, [key: string]: any }) => ({
  images: postImages.map((item: { link: string }) => item.link),
  isFavorite: false,
  ...data
})); 