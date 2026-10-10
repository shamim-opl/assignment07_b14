"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { Field, FormError } from "./AuthShell";
import SocialButtons, { OrDivider } from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }
    setLoading(true);
    const { error } = await signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    const from = params.get("from");
    router.push(from && from.startsWith("/") ? from : "/");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="ইমেইল"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="পাসওয়ার্ড"
          type="password"
          autoComplete="current-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormError message={error} />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "অপেক্ষা করুন…" : "সাইন ইন"}
        </button>
      </form>
      <OrDivider />
      <SocialButtons />
      <p className="mt-5 text-center text-sm text-ink/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
