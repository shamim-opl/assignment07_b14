"use client";

import { useMemo } from "react";
import { bn } from "@/lib/bn";
import { useProducts } from "@/lib/hooks";
import type { Product } from "@/lib/types";
import { ErrorState, ProductGrid, ProductGridSkeleton } from "./ProductGrid";

function Movers({
  id,
  icon,
  title,
  tone,
  items,
  loading,
}: {
  id: string;
  icon: string;
  title: string;
  tone: string;
  items: Product[];
  loading: boolean;
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 flex items-center gap-2 text-xl font-bold">
        <span className={tone}>{icon}</span>
        {title}
      </h2>
      {loading ? <ProductGridSkeleton /> : <ProductGrid products={items} />}
    </section>
  );
}

export default function HomeProducts() {
  const { data, loading, error } = useProducts();

  const { risers, fallers } = useMemo(() => {
    const all = data ?? [];
    return {
      risers: all
        .filter((p) => p.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6),
      fallers: all
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6),
    };
  }, [data]);

  if (error) return <ErrorState />;

  return (
    <div className="space-y-10">
      <Movers
        id="risers"
        icon="▲"
        tone="text-success"
        title="আজ দাম বেড়েছে"
        items={risers}
        loading={loading}
      />
      <Movers
        id="fallers"
        icon="▼"
        tone="text-danger"
        title="আজ দাম কমেছে"
        items={fallers}
        loading={loading}
      />
      <section id="সব-পণ্য" aria-labelledby="all-products">
        <h2 id="all-products" className="text-xl font-bold">
          সব পণ্য
        </h2>
        <p className="mb-4 mt-1 min-h-5 text-sm text-ink/60">
          {data ? `মোট ${bn(data.length)}টি পণ্য দেখানো হচ্ছে` : "লোড হচ্ছে…"}
        </p>
        {loading ? <ProductGridSkeleton count={9} /> : <ProductGrid products={data ?? []} />}
      </section>
    </div>
  );
}
