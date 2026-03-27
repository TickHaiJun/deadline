import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ScenarioEntryCardProps = {
  href: string;
  title: string;
  description: string;
  audience: string;
  points: string[];
  theme: "exam" | "holiday";
};

export function ScenarioEntryCard({
  href,
  title,
  description,
  audience,
  points,
  theme,
}: ScenarioEntryCardProps) {
  const themeClass =
    theme === "exam"
      ? "from-sky-500/12 via-white/75 to-blue-500/10 dark:from-sky-500/12 dark:via-white/5 dark:to-blue-500/12"
      : "from-amber-500/12 via-white/75 to-orange-500/10 dark:from-amber-500/12 dark:via-white/5 dark:to-orange-500/12";

  return (
    <Link
      href={href}
      className={`glass-panel group block rounded-[36px] bg-gradient-to-br p-8 transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.15)] ${themeClass}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{audience}</p>
      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {points.map((point) => (
          <span
            key={point}
            className="rounded-full border border-white/60 bg-white/65 px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {point}
          </span>
        ))}
      </div>

      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
        进入场景
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
