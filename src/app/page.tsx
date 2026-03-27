import Link from "next/link";

import { QuickEntryList, type QuickEntryItem } from "@/components/home/quick-entry-list";
import { ScenarioEntryCard } from "@/components/home/scenario-entry-card";
import { HighlightCard } from "@/components/shared/highlight-card";
import { SectionHeader } from "@/components/shared/section-header";
import { getHomepageHighlights } from "@/lib/timeline";

const highlights = getHomepageHighlights();

const examEntries: QuickEntryItem[] = [
 { label: "即将到来", href: "/exam?tag=即将到来" },
 { label: "教育", href: "/exam?tag=教育" },
 { label: "财会", href: "/exam?tag=财会" },
 { label: "计算机", href: "/exam?tag=计算机" },
 { label: "工程", href: "/exam?tag=工程" },
 { label: "金融", href: "/exam?tag=金融" },
];

const holidayEntries: QuickEntryItem[] = [
 { label: "全部", href: "/holiday?tag=全部" },
 { label: "可拼假", href: "/holiday?tag=可拼假" },
 { label: "家庭团聚", href: "/holiday?tag=家庭团聚" },
 { label: "长途", href: "/holiday?tag=长途" },
 { label: "短途", href: "/holiday?tag=短途" },
 { label: "下半年", href: "/holiday?tag=下半年" },
];

export default function HomePage() {
 return (
 <main className="pb-24">
 <section className="relative overflow-hidden px-6 pt-16">
 <div className="mx-auto max-w-6xl">
 <div className="glass-panel relative overflow-hidden rounded-[48px] px-8 py-16 md:px-14 md:py-20">
 <div className="pointer-events-none absolute inset-0">
 <div className="absolute left-[-8%] top-[-18%] h-56 w-56 rounded-full bg-sky-400/18 blur-3xl dark:bg-sky-500/12" />
 <div className="absolute right-[6%] top-[8%] h-40 w-40 rounded-full bg-amber-300/24 blur-3xl dark:bg-amber-400/10" />
 <div className="absolute bottom-[-12%] right-[18%] h-52 w-52 rounded-full bg-emerald-400/16 blur-3xl dark:bg-emerald-400/8" />
 </div>

 <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
 <div>
 <p className="text-sm font-semibold uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400">Timeline 2026</p>
 <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
 <span className="title-gradient">重要时间节点</span>
 <br />
 <span className="text-slate-950 dark:text-white">两个模式，直接进入。</span>
 </h1>
 <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Exam mode for planning. Holiday mode for rhythm.</p>
 <div className="mt-10 flex flex-wrap gap-4">
 <Link href="/exam" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
 进入备考模式
 </Link>
 <Link href="/holiday" className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-white">
 进入假期模式
 </Link>
 </div>
 </div>

 <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
 <div className="rounded-[28px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
 <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Now</p>
 <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{highlights[0]?.name ?? "时间窗口"}</p>
 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{highlights[0] ? `${highlights[0].daysLeft} 天后开始` : "保持关注最近节点"}</p>
 </div>
 <div className="rounded-[28px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
 <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Exam</p>
 <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">分类切换</p>
 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">首页标签可直接带着筛选条件进入备考模式。</p>
 </div>
 <div className="rounded-[28px] border border-white/50 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
 <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Holiday</p>
 <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">节奏查看</p>
 <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">假期页面会自动过滤已过期节点，并保留 2027 春节提示。</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mx-auto max-w-6xl px-6 py-20">
 <SectionHeader eyebrow="Now" title="最近节点" />
 <div className="mt-8 grid gap-6 lg:grid-cols-3">
 {highlights.map((item) => (
 <HighlightCard key={item.id} item={item} />
 ))}
 </div>
 </section>

 <section className="mx-auto max-w-6xl px-6 pb-20">
 <SectionHeader eyebrow="Scenes" title="两个模式" />
 <div className="mt-8 grid gap-6 lg:grid-cols-2">
 <ScenarioEntryCard
 href="/exam"
 title="备考模式"
 audience="For Exams"
 description="按时间、赛道和热度查看全年考试节点。"
 points={["近期考试", "热门方向", "分类切换", "重点节点"]}
 theme="exam"
 />
 <ScenarioEntryCard
 href="/holiday"
 title="假期模式"
 audience="For Holidays"
 description="围绕全年节奏查看假期、拼假和出行窗口。"
 points={["下一个假期", "最长假期", "拼假节点", "全年节奏"]}
 theme="holiday"
 />
 </div>
 </section>

 <section className="mx-auto max-w-6xl px-6">
 <div className="grid gap-6 lg:grid-cols-2">
 <QuickEntryList title="备考方向" items={examEntries} />
 <QuickEntryList title="假期节点" items={holidayEntries} />
 </div>
 </section>
 </main>
 );
}
