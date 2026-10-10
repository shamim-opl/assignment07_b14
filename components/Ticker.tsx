"use client";

import { bn, bnPct, unitName } from "@/lib/bn";
import { useProducts } from "@/lib/hooks";
import type { Product } from "@/lib/types";

function Item({ p }: { p: Product }) {
  const { dir, pct } = p.change;
  const color = dir === "up" ? "text-danger" : dir === "down" ? "text-success" : "text-ink";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <li className="flex shrink-0 items-center gap-2 px-4 text-sm">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-ink/70">
        {bn(p.today)} টাকা/{unitName(p.unit)}
      </span>
      <span className={`font-medium ${color}`}>
        {arrow} {bnPct(pct)}%
      </span>
    </li>
  );
}

export default function Ticker() {
  const { data } = useProducts();

  return (
    <div
      className="ticker overflow-hidden border-b border-base-300 bg-base-100"
      aria-label="আজকের দামের স্ট্রিপ"
    >
      {data ? (
        <ul className="ticker-track flex h-9 w-max items-center">
          {[...data, ...data].map((p, i) => (
            <Item key={`${p.id}-${i}`} p={p} />
          ))}
        </ul>
      ) : (
        <div className="h-9" />
      )}
    </div>
  );
}
