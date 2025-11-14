// 🔹 Literal type union for allowed payment methods
export type PaymentMethod = "card" | "paypal" | "bank";

// 🔹 Each method has its own object shape
export interface CardPayment {
    method: "card";
    cardNumber: string;
    cvv: string;
    amount: number;
}

export interface PaypalPayment {
    method: "paypal";
    email: string;
    amount: number;
}

export interface BankPayment {
    method: "bank";
    iban: string;
    amount: number;
}

// 🔹 Union type — can be any of the above
export type Payment = CardPayment | PaypalPayment | BankPayment;
