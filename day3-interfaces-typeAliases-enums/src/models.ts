// src/models.ts

// Type alias for flexible ID types
export type ID = string | number;

// Enum for user roles
export enum Role {
    Admin = "ADMIN",
    Member = "MEMBER",
    Guest = "GUEST"
}

// Interface for a user
export interface User {
    readonly id: ID;      // cannot change once created
    name: string;
    email?: string;       // optional
    role: Role;
    isActive: boolean;
}
