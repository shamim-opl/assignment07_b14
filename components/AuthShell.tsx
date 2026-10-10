import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-x py-10 sm:py-14">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-ink/70">{subtitle}</p>
        </div>
        <div className="card mt-6 p-5 sm:p-6">{children}</div>
        <p className="mt-5 text-center text-sm">
          <Link href="/" className="text-ink/70 hover:text-primary">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
}

export function Field({
  label,
  error,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        className={`input ${error ? "!border-danger" : ""}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
      {message}
    </p>
  );
}
