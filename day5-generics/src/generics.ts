// src/generics.ts
import { ID, HasId } from "./types";

/* 1) Simple generic function: identity
   It returns exactly the same type that was passed in. */
export function identity<T>(value: T): T {
    return value;
}

/* 2) Generic function with arrays: first element */
export function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

/* 3) Generic with default type parameter */
export function wrap<T = string>(value: T) {
    return { value };
}

/* 4) Generic constraint: require an object that has 'id' (HasId)
   This ensures we can safely access `.id` inside the function. */
export function getId<T extends HasId>(item: T): ID {
    return item.id;
}

/* 5) Reusable generic data structure: Stack<T> */
export class Stack<T> {
    private items: T[] = [];

    push(item: T) {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

/* 6) Generic Repository pattern with constraint & keyof
   - T extends HasId: every stored item must have an 'id'
   - K extends keyof T: allows selecting a key from T safely
*/
export class Repository<T extends HasId> {
    private store = new Map<ID, T>();

    add(item: T) {
        this.store.set(item.id, item);
    }

    get(id: ID): T | undefined {
        return this.store.get(id);
    }

    remove(id: ID) {
        this.store.delete(id);
    }

    // example: pick property value by key in a type-safe way
    pick<K extends keyof T>(id: ID, key: K): T[K] | undefined {
        const item = this.store.get(id);
        return item ? item[key] : undefined;
    }
}
