import { SkillCategory } from '@/api/skill-category.api';
import { UserRole, userRoles } from '@/constant/enum';
import { z } from 'zod';

export interface User {
  id: number;
  username: string;
  avatar: string;
  roles: UserRole[];
  authorities: string[];
  about: string;
  skills: SkillCategory[];
}

export interface Session extends User {
  isVerified: boolean;
  rolePicked: boolean;
}

export interface UserProfile {
  id: number;
  username: string;
  avatar: string;
  about: string;
  welcomeMessage: string;
  skills: SkillCategory[];
}

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Tên phải nhiều hơn 1 kí tự',
    })
    .max(40, { message: 'Tên phải ít hơn 40 kí tự' })
    .optional(),

  about: z.string().max(1000, { message: 'Mô tả phải ít hơn 1000 kí tự' }).optional(),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;

export const getUsersSchema = z.object({
  role: z.enum(userRoles),
  page: z.number().min(1),
  size: z.number().max(50),
});

export type GetUsersRequest = z.infer<typeof getUsersSchema>;
