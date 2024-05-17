import SortTag from '@/app/types/response/SortTag';
import { z } from 'zod';

const configSchema = z.object({
    locales: z.array(z.string()),
    defaultLocale: z.string(),
    url: z.object({
        base: z.string()
    })
});

const env = configSchema.parse({
    locales: ['vi', 'en'],
    defaultLocale: 'en',
    url: {
        base: 'http://localhost:3000'
    }
});

export default env;

export const defaultSortTag: SortTag = 'time_1';