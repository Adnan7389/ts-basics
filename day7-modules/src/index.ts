// src/index.ts
import { Library } from "./Library.js";
import { Book } from "./Book.js";
import { Member } from "./Member.js";

const lib = new Library("Central Library");

// Add books
lib.addBook({ isbn: "978-1", title: "Clean Code", author: "Robert C. Martin", copies: 2 });
lib.addBook({ isbn: "978-2", title: "You Don't Know JS", author: "Kyle Simpson", copies: 1 });

// Add members
const alice = new Member({ id: "m1", name: "Alice" });
const bob = new Member({ id: "m2", name: "Bob", maxBorrow: 2 });
lib.addMember(alice);
lib.addMember(bob);

console.log("Initial books:");
for (const b of lib.listBooks()) {
    console.log(b.toString());
}

console.log("\nInitial members:");
for (const m of lib.listMembers()) {
    console.log(m.toString());
}

// Borrowing
console.log("\nBorrowing attempts:");
console.log("Alice borrows 978-1:", lib.borrowBook("m1", "978-1")); // true
console.log("Bob borrows 978-1:", lib.borrowBook("m2", "978-1"));   // true (last copy)
console.log("Alice tries again (978-1):", lib.borrowBook("m1", "978-1")); // false (no copies)

// Return
console.log("\nReturn:");
lib.returnBook("m2", "978-1");
console.log("Alice tries again (978-1):", lib.borrowBook("m1", "978-1")); // now true

console.log("\nFinal book states:");
for (const b of lib.listBooks()) {
    console.log(b.toString());
}

console.log("\nFinal members:");
for (const m of lib.listMembers()) {
    console.log(m.toString());
}
