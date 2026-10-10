"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { bnDate } from "@/lib/bn";
import { useCategories } from "@/lib/hooks";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data: categories } = useCategories();
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setDate(bnDate()), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function handleSignOut() {
    await signOut();
    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;

  return (
    <nav aria-label="মূল নেভিগেশন">
      <div className="container-x flex h-[68px] items-center justify-between gap-2 sm:gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-base-200 text-lg sm:h-10 sm:w-10 sm:text-xl">
            🛒
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-xl font-bold">বাজার দর</span>
            <span className="min-h-4 truncate text-[11px] text-ink/60 sm:text-xs" suppressHydrationWarning>
              {date}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {isPending ? (
            <div className="skeleton h-10 w-28 !rounded-lg" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                className="btn btn-ghost !px-2"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="menu"
              >
                <Avatar name={user.name} />
                <span className="hidden max-w-28 truncate sm:inline">{user.name.split(" ")[0]}</span>
                <span className="text-xs">▾</span>
              </button>
              {open && (
                <div role="menu" className="card absolute right-0 mt-2 w-48 p-1.5 shadow-lg">
                  <Link
                    href="/profile"
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-base-200"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    role="menuitem"
                    onClick={handleSignOut}
                    className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-danger hover:bg-base-200"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-sm sm:h-10 sm:px-4">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:h-10 sm:px-4">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-base-300">
        <ul className="container-x grid grid-cols-4 gap-1 py-2 sm:flex sm:overflow-x-auto sm:[scrollbar-width:none]">
          {categories
            ? categories.map((c) => {
                const active = pathname === `/category/${c.slug}`;
                return (
                  <li key={c.id} className="min-w-0 sm:shrink-0">
                    <Link
                      href={`/category/${c.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-lg px-1 text-[13px] transition-colors sm:justify-start sm:gap-1.5 sm:px-3 sm:text-sm ${
                        active ? "bg-primary font-medium text-primary-content" : "hover:bg-base-200"
                      }`}
                    >
                      <span>{c.icon}</span>
                      {c.nameBn}
                    </Link>
                  </li>
                );
              })
            : Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className="skeleton h-8 sm:w-20 sm:shrink-0 !rounded-lg" />
              ))}
        </ul>
      </div>
    </nav>
  );
}
