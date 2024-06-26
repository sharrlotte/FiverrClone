export type UserRole = 'ADMIN' | 'USER' | 'EMPLOYEE' | 'CANDIDATE' | 'RECRUITER';

export const durationTypes = ['Hour', 'Day', 'Week', 'Month', 'Year'] as const;

export type DurationType = (typeof durationTypes)[number];
