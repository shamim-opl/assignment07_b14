"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProducts } from "@/lib/hooks";
import { bn, perUnit, taka, unitName } from "@/lib/bn";
import type { Product } from "@/lib/types";
import EmptyState from "./EmptyState";
import { ErrorState } from "./ProductGrid";
import { ChangeBadge } from "./ProductCard";

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-ink/60">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-ink/60">{hint}</p>
    </div>
  );
}

function changeLine(p: Product) {
  const diff = Math.abs(p.today - p.yesterday);
  if (p.change.dir === "up") return `গতকালের তুলনায় আজ দাম বেড়েছে · ${bn(diff)} টাকা`;
  if (p.change.dir === "down") return `গতকালের তুলনায় আজ দাম কমেছে · ${bn(diff)} টাকা`;
  return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
}

function Loading() {
  return (
    <div className="container-x space-y-4 pt-6" aria-busy="true">
      <div className="skeleton h-6 w-64" />
      <div className="skeleton h-40" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-28" />
        <div className="skeleton h-28" />
        <div className="skeleton h-28" />
      </div>
      <div className="skeleton h-80" />
    </div>
  );
}

export default function ProductDetails({ slug }: { slug: string }) {
  // The API looks products up by numeric id, so the slug is resolved from the shared product list.
  const { data, loading, error } = useProducts();
  const product = useMemo(
    () => data?.find((p) => p.slug === slug || String(p.id) === slug) ?? null,
    [data, slug],
  );
  const status = loading ? "loading" : error ? "error" : product ? "ok" : "missing";

  const stats = useMemo(() => {
    if (!product) return null;
    const m = product.markets;
    const lowest = m.reduce((a, b) => (b.min < a.min ? b : a));
    const highest = m.reduce((a, b) => (b.max > a.max ? b : a));
    const avg = Math.round(m.reduce((s, x) => s + (x.min + x.max) / 2, 0) / m.length);
    return { lowest, highest, avg };
  }, [product]);

  if (status === "loading") return <Loading />;
  if (status === "missing")
    return (
      <EmptyState
        title="পণ্যটি পাওয়া যায়নি"
        message="এই নামে কোনো পণ্য নেই অথবা লিংকটি ভুল।"
      />
    );
  if (status === "error" || !product || !stats)
    return (
      <div className="container-x pt-6">
        <ErrorState />
      </div>
    );

  const p = product;

  return (
    <div className="container-x space-y-6 pt-6">
      <nav aria-label="breadcrumb" className="text-sm text-ink/70">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-primary">
              হোম
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link href={`/category/${p.category}`} className="hover:text-primary">
              {p.categoryNameBn}
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li className="font-medium text-ink" aria-current="page">
            {p.nameBn}
          </li>
        </ol>
      </nav>

      <header className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">
            {p.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{p.nameBn}</h1>
            <p className="mt-1 text-sm text-ink/70">{changeLine(p)}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <Link
                href={`/category/${p.category}`}
                className="rounded-full bg-base-200 px-2.5 py-1 hover:bg-base-300"
              >
                {p.categoryIcon} {p.categoryNameBn}
              </Link>
              <span className="rounded-full bg-base-200 px-2.5 py-1">{perUnit(p.unit)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-base-200 px-5 py-3 text-center sm:min-w-36">
          <p className="text-sm text-ink/70">আজকের দাম</p>
          <p className="text-4xl font-bold leading-tight">{bn(p.today)}</p>
          <p className="text-sm text-ink/70">টাকা / {unitName(p.unit)}</p>
          <div className="mt-1">
            <ChangeBadge dir={p.change.dir} pct={p.change.pct} large />
          </div>
        </div>
      </header>

      <section aria-labelledby="summary">
        <h2 id="summary" className="mb-3 text-xl font-bold">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="সর্বনিম্ন দাম"
            value={taka(stats.lowest.min)}
            hint={`সবচেয়ে কম দামের বাজার: ${stats.lowest.market}`}
          />
          <Stat
            label="সর্বাধিক দাম"
            value={taka(stats.highest.max)}
            hint={`সবচেয়ে বেশি দামের বাজার: ${stats.highest.market}`}
          />
          <Stat label="গড় দাম" value={taka(stats.avg)} hint={`${perUnit(p.unit)}-এর হিসাবে`} />
        </div>
      </section>

      <section aria-labelledby="markets">
        <h2 id="markets" className="mb-3 text-xl font-bold">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-base-200 text-ink/70">
              <tr>
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m) => (
                <tr key={m.market} className="border-t border-base-300 hover:bg-base-200/50">
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-ink/70">{m.division}</td>
                  <td className="px-4 py-3 text-right">{taka(m.min)}</td>
                  <td className="px-4 py-3 text-right">{taka(m.max)}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {taka(Math.round((m.min + m.max) / 2))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
