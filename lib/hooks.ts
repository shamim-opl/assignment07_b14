"use client";

import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "./api";
import type { Category, Product } from "./types";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

// Tiny module-level cache so navbar, ticker and pages share a single request.
const cache = new Map<string, Promise<unknown>>();

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) {
    const p = load().catch((e) => {
      cache.delete(key);
      throw e;
    });
    cache.set(key, p);
  }
  return cache.get(key) as Promise<T>;
}

function useLoad<T>(key: string, load: () => Promise<T>): State<T> {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: false });

  useEffect(() => {
    let alive = true;
    setState({ data: null, loading: true, error: false });
    cached(key, load)
      .then((data) => alive && setState({ data, loading: false, error: false }))
      .catch(() => alive && setState({ data: null, loading: false, error: true }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

export const useProducts = (category?: string) =>
  useLoad<Product[]>(`products:${category ?? "all"}`, () => fetchProducts(category));

export const useCategories = () => useLoad<Category[]>("categories", fetchCategories);
