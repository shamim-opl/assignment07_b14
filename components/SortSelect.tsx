export type SortKey = "default" | "asc" | "desc";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-ink/70">সাজান</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="h-8 cursor-pointer appearance-none rounded-lg border border-base-300 bg-base-100 pl-3 pr-8 text-sm outline-none focus:border-primary"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2 3.5 5 6.5 8 3.5" />
        </svg>
      </span>
    </label>
  );
}
