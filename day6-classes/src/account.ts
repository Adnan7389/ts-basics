// src/account.ts
// Bank account classes: abstract Account, SavingsAccount, CheckingAccount
// Shows constructors, access modifiers, readonly fields, inheritance, overriding.

// A small type alias for currency amounts (could be extended later)
export type Amount = number;

/**
 * Abstract base class representing a generic bank account.
 * - It's abstract because we don't create generic "Account" instances directly.
 * - Concrete accounts (SavingsAccount, CheckingAccount) implement specific rules.
 */
export abstract class Account {
    // readonly: cannot change after construction (account number is fixed)
    public readonly accountNumber: string;

    // private: only the class itself can access owner
    private owner: string;

    // protected: subclasses can access and modify balance, but external code cannot
    protected balance: Amount;

    // track transaction history simply as strings for demo purposes (public read-only view)
    private transactions: string[] = [];

    constructor(accountNumber: string, owner: string, openingBalance: Amount = 0) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = openingBalance;
        this.transactions.push(`Account opened with balance ${this.format(this.balance)}`);
    }

    // Protected helper to format amounts (internal use)
    public format(amount: Amount): string {
        return `$${amount.toFixed(2)}`;
    }

    // Public getter for owner (read-only to outside)
    public getOwner(): string {
        return this.owner;
    }

    // Public getter for current balance (read-only)
    public getBalance(): Amount {
        return this.balance;
    }

    // Public method to deposit money
    public deposit(amount: Amount): void {
        if (amount <= 0) throw new Error("Deposit amount must be positive");
        this.balance += amount;
        this.transactions.push(`Deposit: +${this.format(amount)} -> ${this.format(this.balance)}`);
    }

    // Public method to withdraw money (base class provides generic check; subclasses may override)
    public withdraw(amount: Amount): void {
        if (amount <= 0) throw new Error("Withdraw amount must be positive");
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
        this.transactions.push(`Withdraw: -${this.format(amount)} -> ${this.format(this.balance)}`);
    }

    // Transfer money to another account (uses deposit/withdraw and records transactions on both)
    public transferTo(amount: Amount, target: Account): void {
        // Use current class' withdraw (may be overridden) and target.deposit
        this.withdraw(amount);
        target.deposit(amount);
        this.transactions.push(`Transfer out: -${this.format(amount)} -> ${this.format(this.balance)} to ${target.accountNumber}`);
        // Add a note to target's transactions (we can access a target's private field only via its public API)
        target.recordTransaction(`Transfer in: +${this.format(amount)} from ${this.accountNumber} -> ${this.format(target.getBalance())}`);
    }

    // Protected method to let subclasses or trusted code append to transactions
    protected recordTransaction(note: string) {
        this.transactions.push(note);
    }

    // Allow external code to read a copy of the transaction history
    public getTransactions(): string[] {
        return [...this.transactions];
    }

    // An abstract method that each subclass should implement to apply monthly processing (interest, fees)
    // Returns a description of what was applied (helpful for logs)
    public abstract applyMonthlyUpdate(): string;
}
