import { UserRole } from "@prisma/client";

export class User {
    id: number;
    email: string;
    userName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles?: UserRole[]; 
}

