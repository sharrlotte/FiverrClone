import { User } from "@prisma/client";
import { Request } from 'express';

export function getUser(req: Request) {
    return req.user as unknown as User
}
