export type UserRole = 'ADMIN' | 'USER';

export const durationTypes = ['Hour', 'Day', 'Week', 'Month', 'Year'] as const;

export type DurationType = (typeof durationTypes)[number];
