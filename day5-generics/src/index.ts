// src/index.ts
import { identity, firstElement, wrap, getId, Stack, Repository } from "./generics";
import { HasId } from "./types";

// demo types
type User = { id: number; name: string; age: number };
type Product = { id: string; title: string; price: number };

// 1) identity
const x = identity<number>(42);
const y = identity("hello"); // TS infers T = string

// 2) firstElement
const names = ["Aster", "Adnan", "Liya"];
console.log("first name", firstElement(names)); // inferred as string | undefined

// 3) wrap
const wrappedDefault = wrap("abc"); // T defaults to string
const wrappedNumber = wrap<number>(123); // T = number

// 4) constraint getId
const user: User = { id: 1, name: "Aster", age: 29 };
console.log("user id", getId(user));

// 5) Stack usage
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log("stack peek", numberStack.peek());

// 6) Repository usage
const productRepo = new Repository<Product>();
productRepo.add({ id: "p1", title: "Shoes", price: 59.99 });
productRepo.add({ id: "p2", title: "Hat", price: 19.99 });

console.log("product p1 title:", productRepo.pick("p1", "title"));
console.log("product p2 price:", productRepo.pick("p2", "price"));