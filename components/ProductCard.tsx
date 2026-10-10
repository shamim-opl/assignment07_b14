import Link from "next/link";
import { bn, bnPct, perUnit } from "@/lib/bn";
import type { Product } from "@/lib/types";

export function ChangeBadge({ dir, pct, large = false }: { dir: Product["change"]["dir"]; pct: number; large?: boolean }) {
  // Matches the Figma: price up = red, price down = green, flat = neutral.
  const style =
    dir === "up"
      ? "bg-base-200 text-danger"
      : dir === "down"
        ? "bg-base-200 text-success"
        : "bg-base-200 text-ink";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 font-medium ${style} ${
        large ? "h-7 text-sm" : "h-6 text-xs"
      }`}
    >
      <span>{arrow}</span>
      {bnPct(pct)}%
    </span>
  );
}

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="card group block p-4 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold group-hover:text-primary">{p.nameBn}</h3>
          <p className="text-xs text-ink/60">{perUnit(p.unit)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-ink/60">আজকের দাম</p>
          <p className="text-xl font-bold leading-7">
            {bn(p.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return <div className="skeleton h-[138px]" />;
}
