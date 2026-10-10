"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCategory, NotFoundError } from "@/lib/api";
import { bn } from "@/lib/bn";
import { useProducts } from "@/lib/hooks";
import type { Category } from "@/lib/types";
import EmptyState from "./EmptyState";
import { ErrorState, ProductGrid, ProductGridSkeleton } from "./ProductGrid";
import SortSelect, { SortKey } from "./SortSelect";

export default function CategoryView({ slug }: { slug: string }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [missing, setMissing] = useState(false);
  const [sort, setSort] = useState<SortKey>("default");
  const { data, loading, error } = useProducts(slug);

  useEffect(() => {
    let alive = true;
    setCategory(null);
    setMissing(false);
    fetchCategory(slug)
      .then((c) => alive && setCategory(c))
      .catch((e) => alive && e instanceof NotFoundError && setMissing(true));
    return () => {
      alive = false;
    };
  }, [slug]);

  // Sorting uses the numeric price, so Bengali formatting never affects the order.
  const sorted = useMemo(() => {
    const list = [...(data ?? [])];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [data, sort]);

  if (missing || (!loading && !error && data && data.length === 0 && !category)) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কিছু পাওয়া যায়নি"
        message="ক্যাটাগরিটি নেই অথবা এখানে কোনো পণ্য যোগ করা হয়নি।"
      />
    );
  }

  return (
    <div className="container-x space-y-4 pt-6">
      <header className="card p-5">
        {category ? (
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{category.nameBn}</h1>
              <p className="text-sm text-ink/70">
                {data ? `${bn(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন` : "লোড হচ্ছে…"}
              </p>
            </div>
          </div>
        ) : (
          <div className="skeleton h-[52px] max-w-xs" />
        )}
      </header>

      <div className="card flex items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-ink/60">
          {data ? `মোট ${bn(data.length)}টি পণ্য দেখানো হচ্ছে` : "লোড হচ্ছে…"}
        </p>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {error ? (
        <ErrorState />
      ) : loading ? (
        <ProductGridSkeleton count={6} />
      ) : (
        <ProductGrid products={sorted} />
      )}
    </div>
  );
}
