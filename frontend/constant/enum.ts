export const userRoles = ['ADMIN', 'USER', 'EMPLOYEE', 'CANDIDATE', 'RECRUITER'] as const;

export type UserRole = (typeof userRoles)[number];

export const durationTypes = ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR'] as const;

export type DurationType = (typeof durationTypes)[number];
