"use client";

import { useSyncExternalStore } from "react";
import type { Item } from "./data";

export type Line = { id: string; name: string; price: number; qty: number };

const KEY = "chauve-cart-v1";
const EMPTY: Line[] = [];
let lines: Line[] | null = null;
const listeners = new Set<() => void>();

function load(): Line[] {
  if (lines === null) {
    try {
      const raw = localStorage.getItem(KEY);
      lines = raw ? (JSON.parse(raw) as Line[]) : [];
    } catch {
      lines = [];
    }
  }
  return lines;
}

function save(next: Line[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

/** Tiny shared cart store: survives page changes and reloads, no library needed. */
export const cart = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => (typeof window === "undefined" ? EMPTY : load()),
  add(item: Pick<Item, "id" | "name" | "price">, qty = 1) {
    const cur = load();
    const found = cur.find((x) => x.id === item.id);
    save(
      found
        ? cur.map((x) => (x.id === item.id ? { ...x, qty: x.qty + qty } : x))
        : [...cur, { id: item.id, name: item.name, price: item.price, qty }],
    );
  },
  setQty(id: string, qty: number) {
    const cur = load();
    save(qty <= 0 ? cur.filter((x) => x.id !== id) : cur.map((x) => (x.id === id ? { ...x, qty } : x)));
  },
  clear() {
    save([]);
  },
};

export function useCart() {
  return useSyncExternalStore(cart.subscribe, cart.get, () => EMPTY);
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 ? 2 : 0 });

export const totals = (ls: Line[]) => {
  const subtotal = ls.reduce((s, l) => s + l.price * l.qty, 0);
  const count = ls.reduce((s, l) => s + l.qty, 0);
  return { subtotal, count };
};
