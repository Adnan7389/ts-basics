// src/index.ts
import { processPayment } from "./processor";
import { printAmount, hasEmail } from "./utils";
import { Payment } from "./types";

// 🔹 Example payments
const payments: Payment[] = [
    { method: "card", cardNumber: "1234567890123456", cvv: "123", amount: 150 },
    { method: "paypal", email: "adnan@example.com", amount: 75 },
    { method: "bank", iban: "DE89370400440532013000", amount: 420 },
];

// 🔹 Process each payment
for (const pay of payments) {
    const message = processPayment(pay);
    console.log(message);
    printAmount(pay.amount);
}

// 🔹 Test our type guard
const maybeUser = { name: "Adnan", email: "adnan@example.com" };

if (hasEmail(maybeUser)) {
    console.log(`✅ User with email: ${maybeUser.email}`);
} else {
    console.log("❌ No email found");
}
