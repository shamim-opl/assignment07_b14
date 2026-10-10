"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.5 12.27c0-.8-.07-1.56-.2-2.3H12v4.35h5.9a5.05 5.05 0 0 1-2.19 3.31v2.75h3.54c2.07-1.9 3.25-4.72 3.25-8.11z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.67l-3.54-2.75c-.98.66-2.24 1.05-3.74 1.05-2.87 0-5.3-1.94-6.17-4.55H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.83 14.08a6.6 6.6 0 0 1 0-4.16V7.08H2.18a11 11 0 0 0 0 9.84l3.65-2.84z" />
      <path fill="#EA4335" d="M12 5.37c1.62 0 3.07.56 4.21 1.65l3.15-3.15A10.57 10.57 0 0 0 12 1 11 11 0 0 0 2.18 7.08l3.65 2.84C6.7 7.31 9.13 5.37 12 5.37z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

export default function SocialButtons() {
  const [busy, setBusy] = useState<Provider | null>(null);

  async function go(provider: Provider) {
    setBusy(provider);
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) {
      toast.error(
        provider === "google"
          ? "Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
          : "GitHub দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
      );
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <button type="button" className="btn btn-outline" disabled={!!busy} onClick={() => go("google")}>
        <GoogleIcon />
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" className="btn btn-outline" disabled={!!busy} onClick={() => go("github")}>
        <GitHubIcon />
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-ink/60">
      <span className="h-px flex-1 bg-base-300" />
      অথবা
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}
