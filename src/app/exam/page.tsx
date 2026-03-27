"use client";

import { Sparkles } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SectionHeader } from "@/components/shared/section-header";
import { exams, type ExamCategory } from "@/data/exams";
import { getSortedExamCards } from "@/lib/timeline";

const categories: Array<{ label: string; value: "upcoming" | ExamCategory }> = [
  { label: "即将到来", value: "upcoming" },
  { label: "教育", value: "教育" },
  { label: "财会", value: "财会" },
  { label: "计算机", value: "计算机" },
  { label: "工程", value: "工程" },
  { label: "金融", value: "金融" },
  { label: "职业资格", value: "职业资格" },
  { label: "语言", value: "语言" },
  { label: "医疗", value: "医疗" },
];

function getActiveFromParam(value: string | null): "upcoming" | ExamCategory {
  const matched = categories.find((item) => item.label === value || item.value === value);
  return matched?.value ?? "upcoming";
}

function ExamPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<"upcoming" | ExamCategory>("upcoming");

  useEffect(() => {
    setActive(getActiveFromParam(searchParams.get("tag")));
  }, [searchParams]);

  function updateActive(next: "upcoming" | ExamCategory) {
    setActive(next);
    const target = categories.find((item) => item.value === next)?.label ?? "即将到来";
    router.replace(`${pathname}?tag=${encodeURIComponent(target)}`, { scroll: false });
  }

  const examCards = useMemo(() => getSortedExamCards().filter((item) => item.daysLeft >= 0), []);
  const filtered = useMemo(() => {
    if (active === "upcoming") return examCards;
    return examCards.filter((item) => item.category === active);
  }, [active, examCards]);

  const hotCount = useMemo(() => exams.filter((item) => item.heat).length, []);
  const nextExam = examCards[0];
  const currentLabel = categories.find((item) => item.value === active)?.label ?? "即将到来";

  return (
    <main className="pb-24">
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="glass-panel relative overflow-hidden rounded-[44px] px-8 py-14 md:px-12 md:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8%] top-[-18%] h-56 w-56 rounded-full bg-sky-400/18 blur-3xl dark:bg-sky-500/12" />
            <div className="absolute right-[8%] bottom-[-14%] h-48 w-48 rounded-full bg-indigo-400/16 blur-3xl dark:bg-indigo-500/10" />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <SectionHeader eyebrow="Exam Mode" title="备考模式" description="默认只看未过期节点，支持首页标签直达。" />
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  仅显示未过期考试
                </span>
                <span className="rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  支持标签直达
                </span>
                <span className="rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  热门考试优先关注
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Focus</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{filtered.length}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">当前视图节点数</p>
              </div>
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Next</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{nextExam?.daysLeft ?? "--"} 天</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{nextExam?.name ?? "暂无即将到来的考试"}</p>
              </div>
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Tag</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{currentLabel}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">当前筛选标签</p>
              </div>
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Hot</p>
                <p className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  <Sparkles className="h-5 w-5 text-sky-500" />
                  {hotCount} 个热门
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">教资、CPA、软考、建造师等重点节点</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => updateActive(item.value)}
                className={
                  active === item.value
                    ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
                    : "rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="glass-panel rounded-[32px] p-8 text-center">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">当前分类没有未过期节点</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">切换到其他分类，或回到“即将到来”查看。</p>
            </div>
          ) : null}

          {filtered.map((item) => {
            const source = exams.find((exam) => exam.name === item.name);

            return (
              <article key={item.id} className="glass-panel rounded-[32px] p-6 transition hover:-translate-y-0.5">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300">
                        {item.category}
                      </span>
                      {source?.heat ? (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                          热门
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{item.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.summary}</p>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{source?.audience}</p>
                  </div>

                  <div className="min-w-[140px] rounded-[24px] border border-white/50 bg-white/55 p-4 text-right dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{item.daysLeft}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">days left</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        const nextCategory = categories.find((entry) => entry.label === tag || entry.value === tag);
                        if (nextCategory) {
                          updateActive(nextCategory.value);
                        }
                      }}
                      className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default function ExamPage() {
  return (
    <Suspense fallback={<main className="pb-24" />}>
      <ExamPageContent />
    </Suspense>
  );
}
