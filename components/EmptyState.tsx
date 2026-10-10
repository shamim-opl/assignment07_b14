import Link from "next/link";

export default function EmptyState({
  title = "৪০৪ — পাতাটি পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="container-x py-16">
      <div className="card mx-auto max-w-md p-8 text-center">
        <p className="text-5xl">🧺</p>
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-ink/70">{message}</p>
        <Link href="/" className="btn btn-primary mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
