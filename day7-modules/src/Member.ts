// src/Member.ts
// Represents a library member

export interface MemberData {
    id: string;
    name: string;
    maxBorrow?: number; // how many books the member can borrow simultaneously
}

export class Member {
    public readonly id: string;
    public name: string;
    private borrowedIsbns: Set<string> = new Set();
    private maxBorrow: number;

    constructor(data: MemberData) {
        this.id = data.id;
        this.name = data.name;
        this.maxBorrow = data.maxBorrow ?? 3;
    }

    // returns how many books currently borrowed
    public get borrowedCount(): number {
        return this.borrowedIsbns.size;
    }

    public canBorrow(): boolean {
        return this.borrowedIsbns.size < this.maxBorrow;
    }

    public borrowBook(isbn: string): void {
        if (!this.canBorrow()) throw new Error(`${this.name} has reached borrow limit`);
        this.borrowedIsbns.add(isbn);
    }

    public returnBook(isbn: string): void {
        this.borrowedIsbns.delete(isbn);
    }

    public hasBorrowed(isbn: string): boolean {
        return this.borrowedIsbns.has(isbn);
    }

    public toString(): string {
        return `${this.name} (id: ${this.id}) - borrowed: ${this.borrowedCount}/${this.maxBorrow}`;
    }
}
