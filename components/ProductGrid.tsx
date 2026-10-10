import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import type { Product } from "@/lib/types";

const GRID = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={GRID}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={GRID} aria-busy="true" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="card p-8 text-center">
      <p className="text-lg font-semibold">ডেটা লোড করা যায়নি</p>
      <p className="mt-1 text-sm text-ink/60">ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
      <button className="btn btn-primary mt-4" onClick={onRetry ?? (() => location.reload())}>
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
