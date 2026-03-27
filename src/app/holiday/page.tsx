"use client";

import dayjs from "dayjs";
import { Palmtree } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SectionHeader } from "@/components/shared/section-header";
import { getSortedHolidayCards } from "@/lib/timeline";

const filters = ["全部", "可拼假", "家庭团聚", "长途", "短途", "上半年", "下半年"] as const;

type HolidayFilter = (typeof filters)[number];

function getActiveFromParam(value: string | null): HolidayFilter {
  const matched = filters.find((item) => item === value);
  return matched ?? "全部";
}

function HolidayPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<HolidayFilter>("全部");

  useEffect(() => {
    setActive(getActiveFromParam(searchParams.get("tag")));
  }, [searchParams]);

  function updateActive(next: HolidayFilter) {
    setActive(next);
    router.replace(`${pathname}?tag=${encodeURIComponent(next)}`, { scroll: false });
  }

  const holidayCards = useMemo(() => getSortedHolidayCards().filter((item) => item.daysLeft >= 0), []);
  const filtered = useMemo(() => {
    if (active === "全部") return holidayCards;
    if (active === "可拼假") return holidayCards.filter((item) => item.canBridge);
    return holidayCards.filter((item) => item.tags.includes(active));
  }, [active, holidayCards]);

  const nextHoliday = holidayCards[0];
  const bridgeCount = holidayCards.filter((item) => item.canBridge).length;
  const longestHoliday = useMemo(
    () => [...holidayCards].sort((left, right) => (right.durationDays ?? 0) - (left.durationDays ?? 0))[0],
    [holidayCards]
  );
  const springFestival2027Days = dayjs("2027-02-06").diff(dayjs(), "day");

  return (
    <main className="pb-24">
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="glass-panel relative overflow-hidden rounded-[44px] px-8 py-14 md:px-12 md:py-18">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-8%] top-[-16%] h-56 w-56 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-400/12" />
            <div className="absolute right-[10%] bottom-[-16%] h-52 w-52 rounded-full bg-rose-300/18 blur-3xl dark:bg-rose-400/10" />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <SectionHeader eyebrow="Holiday Mode" title="假期模式" description="自动过滤已过期节点，按节奏和类型查看全年窗口。" />
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  只显示未过期假期
                </span>
                <span className="rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  支持首页标签直达
                </span>
                <span className="rounded-full border border-white/12 bg-white/60 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  内置 2027 春节提示
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Next</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{nextHoliday?.name ?? "暂无节点"}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {nextHoliday ? `${nextHoliday.daysLeft} 天后开始` : "当前没有未过期假期"}
                </p>
              </div>
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Longest</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{longestHoliday?.name ?? "暂无节点"}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{longestHoliday?.durationDays ?? 0} 天，当前最长假期</p>
              </div>
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Bridge</p>
                <p className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-950 dark:text-white">
                  <Palmtree className="h-5 w-5 text-amber-500" />
                  {bridgeCount} 个节点
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">适合做中长线拼假安排</p>
              </div>
              <div className="rounded-[26px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">2027</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">春节 2 月 6 日</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">距离现在还有 {springFestival2027Days} 天</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => updateActive(item)}
                className={
                  active === item
                    ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
                    : "rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="glass-panel rounded-[32px] p-8 text-center">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">当前标签没有未过期假期节点</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">切换到其他标签，或回到“全部”查看。</p>
            </div>
          ) : null}

          {filtered.map((item) => (
            <article key={item.id} className="glass-panel rounded-[32px] p-6 transition hover:-translate-y-0.5">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => updateActive(item.canBridge ? "可拼假" : "全部")}
                      className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300"
                    >
                      {item.canBridge ? "可拼假" : "常规休整"}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateActive((item.tags[0] as HolidayFilter) ?? "全部")}
                      className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {item.tags[0]}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateActive((item.tags[1] as HolidayFilter) ?? "全部")}
                      className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {item.tags[1]}
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{item.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.summary}</p>
                </div>

                <div className="min-w-[150px] rounded-[24px] border border-white/50 bg-white/55 p-4 text-right dark:border-white/10 dark:bg-white/5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.date}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{item.daysLeft}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">days left</p>
                  <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">{item.durationDays} 天假期</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function HolidayPage() {
  return (
    <Suspense fallback={<main className="pb-24" />}>
      <HolidayPageContent />
    </Suspense>
  );
}
