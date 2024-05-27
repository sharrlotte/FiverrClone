import { z } from 'zod';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const FileSchema = z
  .instanceof(File, { message: 'Ảnh chưa được chọn' })
  .refine((files) => files !== undefined)
  .refine((file) => !!file, 'Image is required.')
  .refine((file) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : false), '.jpg, .jpeg, .png and .webp files are accepted.');

export const FileListSchema = z
  .instanceof(FileList, { message: 'Ảnh chưa được chọn' })
  .refine((files) => files !== undefined)
  .refine((files) => !!files, 'Image is required.')
  .refine((files) => new Array(files.length).map((_, index) => files.item(index)).every((file: File | null) => (file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : false)), '.jpg, .jpeg, .png and .webp files are accepted.');
