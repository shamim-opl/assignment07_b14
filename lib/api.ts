import type { Category, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export class NotFoundError extends Error {}

async function request<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) throw new NotFoundError("not found");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      lastError = err;
    }
  }
  throw lastError ?? new Error("request failed");
}

export const fetchProducts = (category?: string) =>
  request<Product[]>(category ? `/products?category=${encodeURIComponent(category)}` : "/products");

export const fetchProduct = (slug: string) =>
  request<Product>(`/products/${encodeURIComponent(slug)}`);

export const fetchCategories = () => request<Category[]>("/categories");

export const fetchCategory = (slug: string) =>
  request<Category>(`/categories/${encodeURIComponent(slug)}`);
