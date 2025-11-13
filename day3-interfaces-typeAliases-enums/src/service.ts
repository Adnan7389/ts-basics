// src/service.ts
import { User, Role } from "./models";

// Function: promote a user’s role (returns a new user object)
export function promoteUser(user: User): User {
    let newRole: Role;

    switch (user.role) {
        case Role.Guest:
            newRole = Role.Member;
            break;
        case Role.Member:
            newRole = Role.Admin;
            break;
        case Role.Admin:
            newRole = Role.Admin; // already at top
            break;
    }

    // Return a new object (don't mutate readonly fields)
    return { ...user, role: newRole };
}

// Function: print user details
export function printUser(user: User): void {
    const { id, name, role, email, isActive } = user;
    console.log(`👤 ${name} [${role}]`);
    console.log(`📧 ${email ?? "No email provided"}`);
    console.log(`🟢 Status: ${isActive ? "Active" : "Inactive"}`);
    console.log(`🆔 ID: ${id}`);
    console.log("-------------");
}
