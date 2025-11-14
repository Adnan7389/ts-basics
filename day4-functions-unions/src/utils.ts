export function printAmount(x: number | string): void {
    // 🔹 Using typeof to narrow
    if (typeof x === "number") {
        console.log(`Amount: $${x.toFixed(2)}`);
    } else {
        console.log(`Amount: $${parseFloat(x).toFixed(2)} (parsed from string)`);
    }
}

// 🔹 Using "in" to narrow object types dynamically
export function hasEmail(obj: unknown): obj is { email: string } {
    return typeof obj === "object" && obj !== null && "email" in obj;
}
