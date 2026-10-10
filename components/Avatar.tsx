export default function Avatar({ name, size = 36 }: { name?: string | null; size?: number }) {
  const initial = (name?.trim()[0] ?? "?").toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-primary font-semibold text-primary-content"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden
    >
      {initial}
    </span>
  );
}
