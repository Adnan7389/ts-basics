// src/Book.ts
// Represents a book in the library

export interface BookData {
    isbn: string;
    title: string;
    author: string;
    copies?: number; // optional; default handled by class
}

// Named export: Book class
export class Book {
    public readonly isbn: string;
    public title: string;
    public author: string;
    // number of copies available
    private _copies: number;

    constructor(data: BookData) {
        this.isbn = data.isbn;
        this.title = data.title;
        this.author = data.author;
        // default to 1 copy if not provided
        this._copies = data.copies ?? 1;
    }

    // public getter for copies
    public get copies(): number {
        return this._copies;
    }

    // increase available copies
    public addCopies(n: number): void {
        if (n <= 0) throw new Error("addCopies requires a positive number");
        this._copies += n;
    }

    // attempt to borrow a copy — returns true if successful
    public borrow(): boolean {
        if (this._copies <= 0) return false;
        this._copies -= 1;
        return true;
    }

    // return a copy
    public returnCopy(): void {
        this._copies += 1;
    }

    // simple display string
    public toString(): string {
        return `${this.title} by ${this.author} (ISBN: ${this.isbn}) — copies: ${this._copies}`;
    }
}
