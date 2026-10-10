"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { Field, FormError } from "./AuthShell";
import SocialButtons, { OrDivider } from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    if (!form.name.trim()) return "নাম লিখুন";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "সঠিক ইমেইল দিন";
    if (form.password.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    if (form.password !== form.confirm) return "পাসওয়ার্ড দুটি মিলছে না";
    return "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate();
    setError(problem);
    if (problem) {
      toast.error(problem);
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);
    if (error) {
      const msg =
        error.code === "USER_ALREADY_EXISTS" || /exist/i.test(error.message ?? "")
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে"
          : "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="নাম"
          autoComplete="name"
          placeholder="যেমন: রহিম উদ্দিন"
          value={form.name}
          onChange={set("name")}
        />
        <Field
          label="ইমেইল"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={set("email")}
        />
        <Field
          label="পাসওয়ার্ড"
          type="password"
          autoComplete="new-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={form.password}
          onChange={set("password")}
        />
        <Field
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          autoComplete="new-password"
          placeholder="আবার লিখুন"
          value={form.confirm}
          onChange={set("confirm")}
        />
        <FormError message={error} />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>
      <OrDivider />
      <SocialButtons />
      <p className="mt-5 text-center text-sm text-ink/70">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
