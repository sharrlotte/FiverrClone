export const userRoles = ['ADMIN', 'USER', 'EMPLOYEE', 'CANDIDATE', 'RECRUITER', 'ACCOUNT'] as const;

export type UserRole = (typeof userRoles)[number];

export const durationTypes = ['HOUR', 'DAY'] as const;

export type DurationType = (typeof durationTypes)[number];
