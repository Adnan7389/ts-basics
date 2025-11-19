// Core library that coordinates Books and Members via imports

import type { BookData } from "./Book.js"; // type-only import
import { Book } from "./Book.js";
import { Member } from "./Member.js";

/**
 * Library manages books (by ISBN) and members (by id).
 * It exposes methods to add books/members, borrow, return, search, and list.
 */
export class Library {
    private books = new Map<string, Book>();   // isbn -> Book
    private members = new Map<string, Member>(); // id -> Member

    constructor(public name: string) { }

    // add a book record (if same ISBN exists, increase copies)
    public addBook(data: BookData): void {
        const existing = this.books.get(data.isbn);
        if (existing) {
            existing.addCopies(data.copies ?? 1);
        } else {
            const book = new Book(data);
            this.books.set(book.isbn, book);
        }
    }

    // register a member
    public addMember(member: Member): void {
        if (this.members.has(member.id)) {
            throw new Error("Member with same id already exists");
        }
        this.members.set(member.id, member);
    }

    // find book by ISBN
    public findBook(isbn: string): Book | undefined {
        return this.books.get(isbn);
    }

    // find member by id
    public findMember(id: string): Member | undefined {
        return this.members.get(id);
    }

    // member borrows a book by isbn — returns true if successful
    public borrowBook(memberId: string, isbn: string): boolean {
        const member = this.findMember(memberId);
        if (!member) throw new Error("Member not found");

        const book = this.findBook(isbn);
        if (!book) throw new Error("Book not found");

        if (!member.canBorrow()) return false; // reached limit
        if (!book.borrow()) return false; // no copies

        // record borrow
        member.borrowBook(isbn);
        return true;
    }

    // member returns a book
    public returnBook(memberId: string, isbn: string): void {
        const member = this.findMember(memberId);
        if (!member) throw new Error("Member not found");

        const book = this.findBook(isbn);
        if (!book) throw new Error("Book not found");

        if (!member.hasBorrowed(isbn)) {
            throw new Error("This member did not borrow this book");
        }

        // process return
        member.returnBook(isbn);
        book.returnCopy();
    }

    // list all books (array copy to avoid external mutation)
    public listBooks(): Book[] {
        return Array.from(this.books.values());
    }

    // list all members
    public listMembers(): Member[] {
        return Array.from(this.members.values());
    }
}
