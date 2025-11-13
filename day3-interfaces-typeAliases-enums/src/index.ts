// src/index.ts
import { User, Role } from "./models";
import { promoteUser, printUser } from "./service";

const users: User[] = [
    { id: 1, name: "Fuad", role: Role.Guest, isActive: true },
    { id: 2, name: "Adnan", role: Role.Member, isActive: true, email: "adnan@example.com" },
    { id: 3, name: "Liya", role: Role.Admin, isActive: false }
];

console.log("=== User List ===");
users.forEach(printUser);

// Promote first user
console.log("\n🔼 Promoting first user...");
if (users[0]) {
    const promoted = promoteUser(users[0]);
    printUser(promoted);
} else {
    console.log("No user to promote.");
}
