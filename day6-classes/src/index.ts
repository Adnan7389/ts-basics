// src/index.ts
// Demo usage of the Account classes

import { Account, Amount } from "./account.js";

/**
 * SavingsAccount:
 * - Earns interest monthly at a given interestRate (e.g., 0.01 = 1% per month)
 * - Prevents overdraft (cannot withdraw more than balance)
 */
class SavingsAccount extends Account {
    // interestRate is public readonly to allow external read but not modification
    public readonly interestRate: number;

    constructor(accountNumber: string, owner: string, openingBalance: Amount = 0, interestRate = 0.01) {
        super(accountNumber, owner, openingBalance);
        this.interestRate = interestRate;
    }

    // Savings account does not change withdraw behavior (uses base class), but we could override if needed.

    // Apply monthly interest and record it
    public applyMonthlyUpdate(): string {
        const interest = this.balance * this.interestRate;
        if (interest > 0) {
            this.deposit(interest); // deposit will record a transaction
            const note = `Monthly interest applied: ${this.format(interest)} at rate ${this.interestRate}`;
            // record a specific note (deposit already added a deposit note, so append detail)
            this.recordTransaction(note);
            return note;
        } else {
            const note = "No interest (balance zero or negative)";
            this.recordTransaction(note);
            return note;
        }
    }
}

/**
 * CheckingAccount:
 * - Allows overdraft up to overdraftLimit (e.g., -500)
 * - Charges a monthly fee (if balance is negative or per-account)
 */
class CheckingAccount extends Account {
    // overdraftLimit is a non-negative number representing how far negative the balance may go
    public readonly overdraftLimit: number;
    private monthlyFee: Amount;

    constructor(accountNumber: string, owner: string, openingBalance: Amount = 0, overdraftLimit = 0, monthlyFee = 5) {
        super(accountNumber, owner, openingBalance);
        this.overdraftLimit = overdraftLimit;
        this.monthlyFee = monthlyFee;
    }

    // Override withdraw to allow overdraft up to -this.overdraftLimit
    public withdraw(amount: Amount): void {
        if (amount <= 0) throw new Error("Withdraw amount must be positive");

        const potentialBalance = this.balance - amount;
        if (potentialBalance < -this.overdraftLimit) {
            // If we would exceed overdraft, reject
            throw new Error("Exceeded overdraft limit");
        }

        // Allow withdrawal (even if balance goes negative as long as within overdraft)
        this.balance = potentialBalance;
        this.recordTransaction(`Withdraw: -${this.format(amount)} -> ${this.format(this.balance)}`);
    }

    // Apply monthly fee and record it
    public applyMonthlyUpdate(): string {
        // Apply fee regardless of positive/negative balance in this simple model
        this.balance -= this.monthlyFee;
        const note = `Monthly fee charged: -${this.format(this.monthlyFee)} -> ${this.format(this.balance)}`;
        this.recordTransaction(note);
        return note;
    }

    // Expose a method to change monthly fee (protected/private would forbid external changes)
    public setMonthlyFee(amount: Amount): void {
        if (amount < 0) throw new Error("Monthly fee cannot be negative");
        this.monthlyFee = amount;
        this.recordTransaction(`Monthly fee set to ${this.format(amount)}`);
    }
}

/* ----------------------- Demo ----------------------- */

// Create accounts
const sa = new SavingsAccount("SA-001", "Aster", 1000, 0.005); // 0.5% monthly
const ca = new CheckingAccount("CA-001", "Adnan", 200, 500, 10); // overdraft 500, monthly fee $10

console.log("Initial balances:");
console.log(`${sa.accountNumber} (${sa.getOwner()}): ${sa.format(sa.getBalance())}`);
console.log(`${ca.accountNumber} (${ca.getOwner()}): ${ca.format(ca.getBalance())}`);

// Do some operations
sa.deposit(200);           // deposit will be recorded
ca.withdraw(250);          // allowed because overdraft limit is 500 (200 - 250 = -50)

// Transfer from savings to checking
sa.transferTo(100, ca);

// Apply monthly updates and print returned notes
console.log("\nMonthly updates:");
console.log(sa.applyMonthlyUpdate()); // interest on savings
console.log(ca.applyMonthlyUpdate()); // monthly fee on checking

// Print final balances
console.log("\nFinal balances:");
console.log(`${sa.accountNumber}: ${sa.format(sa.getBalance())}`);
console.log(`${ca.accountNumber}: ${ca.format(ca.getBalance())}`);

// Show transaction history
console.log("\nSavingsAccount transactions:");
console.log(sa.getTransactions().join("\n"));

console.log("\nCheckingAccount transactions:");
console.log(ca.getTransactions().join("\n"));
