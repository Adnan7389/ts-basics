// src/index.ts
import { fetchUsers } from "./api.js";

async function run() {
    try {
        const users = await fetchUsers();

        console.log("Fetched Users:");
        console.log("----------------");

        // Loop through each user with typed data
        users.forEach((user) => {
            console.log(`ID: ${user.id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Username: ${user.username}`);
            console.log(`Email: ${user.email}`);
            console.log("----------------");
        });
    } catch (err) {
        console.error("Unable to load users:", err);
    }
}

run();
