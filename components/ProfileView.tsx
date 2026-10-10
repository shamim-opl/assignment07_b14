"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  async function handleSignOut() {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="container-x py-10">
      <div className="mx-auto max-w-2xl space-y-5">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-ink/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        {isPending || !user ? (
          <div className="skeleton h-64" aria-busy="true" />
        ) : (
          <>
            <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar name={user.name} size={64} />
                <div className="min-w-0">
                  <p className="truncate text-xl font-bold">{user.name}</p>
                  <p className="truncate text-sm text-ink/70">{user.email}</p>
                </div>
              </div>
              <button className="btn btn-outline" onClick={handleSignOut}>
                ↩ সাইন আউট
              </button>
            </div>

            <div className="card p-5">
              <h2 className="text-lg font-bold">তথ্য</h2>
              <dl className="mt-3 divide-y divide-base-300 text-sm">
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-ink/60">নাম</dt>
                  <dd className="font-medium">{user.name}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-ink/60">ইমেইল</dt>
                  <dd className="truncate font-medium">{user.email}</dd>
                </div>
              </dl>
              <Link href="/profile/update" className="btn btn-primary mt-4 w-full">
                আপডেট
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
