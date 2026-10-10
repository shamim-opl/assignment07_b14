"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";
import { Field, FormError } from "./AuthShell";

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) setName(session.user.name);
  }, [session?.user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("নাম লিখুন");
      toast.error("নাম লিখুন");
      return;
    }
    setError("");
    setLoading(true);
    const { error } = await updateUser({ name: name.trim() });
    setLoading(false);
    if (error) {
      setError("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      toast.error("তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  if (isPending) return <div className="skeleton h-40" aria-busy="true" />;

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field
        label="নাম"
        autoComplete="name"
        placeholder="আপনার নাম"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormError message={error} />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}
      </button>
      <Link href="/profile" className="btn btn-outline w-full">
        বাতিল করুন
      </Link>
    </form>
  );
}
