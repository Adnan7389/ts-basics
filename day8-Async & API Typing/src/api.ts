import { User } from "./types";

// Generic API function to fetch users safely
export async function fetchUsers(): Promise<User[]> {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();

        // TypeScript trusts your return type, so you must ensure it matches User[]
        return data as User[];
    } catch (err) {
        console.error("Error fetching users:", err);
        throw err; // rethrow so caller knows the operation failed
    }
}
