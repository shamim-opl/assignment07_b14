"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { bnDate } from "@/lib/bn";

export default function Hero() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-base-300 bg-gradient-to-br from-base-100 via-base-100 to-primary/10">
      <div className="grid items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[1.4fr_1fr] md:py-10">
        <div className="order-2 md:order-1">
          <span
            className="inline-flex min-h-7 items-center rounded-full bg-primary/10 px-3 text-sm font-medium text-primary"
            suppressHydrationWarning
          >
            {date || "আজকের বাজার"}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 max-w-xl text-ink/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-5">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src="/bazar-hero.png"
            alt="ফলে ভরা বাজারের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-48 sm:w-64 md:w-full md:max-w-[315px]"
          />
        </div>
      </div>
    </section>
  );
}
