// src/processor.ts
import { Payment } from "./types";

// 🔹 Type annotation for parameter (Payment) and return (string)
export function processPayment(payment: Payment): string {
    // We narrow using the "method" property (discriminated union)
    switch (payment.method) {
        case "card":
            // Here TypeScript knows `payment` is CardPayment
            return `💳 Processed card ending ${payment.cardNumber.slice(-4)} for $${payment.amount}`;
        case "paypal":
            // Narrowed to PaypalPayment
            return `💰 PayPal payment from ${payment.email} of $${payment.amount}`;
        case "bank":
            // Narrowed to BankPayment
            return `🏦 Bank transfer via IBAN ${payment.iban.slice(-6)} for $${payment.amount}`;
        default:
            // Should never happen; adding "never" forces compiler safety
            const _exhaustive: never = payment;
            return _exhaustive;
    }
}
