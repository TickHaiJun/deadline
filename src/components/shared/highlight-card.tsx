import Link from "next/link";
import { ArrowRight, Briefcase, CalendarDays, PartyPopper } from "lucide-react";

import { cn } from "@/lib/utils";
import { type TimelineCardItem } from "@/lib/timeline";

type HighlightCardProps = {
 item: TimelineCardItem;
};

export function HighlightCard({ item }: HighlightCardProps) {
 const isExam = item.kind === "exam";
 const href = isExam ? "/exam" : "/holiday";

 return (
 <article
 className={cn(
 "glass-panel rounded-[32px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]",
 isExam ? "ring-1 ring-sky-200/60 dark:ring-sky-400/20" : "ring-1 ring-amber-200/60 dark:ring-amber-400/20"
 )}
 >
 <div className="flex items-center justify-between gap-4">
 <span
 className={cn(
 "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
 isExam ? "bg-sky-500/10 text-sky-700 dark:text-sky-300" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
 )}
 >
 {isExam ? <Briefcase className="h-3.5 w-3.5" /> : <PartyPopper className="h-3.5 w-3.5" />}
 {isExam ? "备考场景" : "假期场景"}
 </span>
 <span className="text-sm font-semibold text-slate-900 dark:text-white">
 {item.daysLeft >= 0 ? `还剩 ${item.daysLeft} 天` : "已过期"}
 </span>
 </div>

 <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">{item.name}</h3>
 <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.summary}</p>

 <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
 <span className="inline-flex items-center gap-1.5">
 <CalendarDays className="h-4 w-4" />
 {item.date}
 </span>
 {item.category ? <span>{item.category}</span> : null}
 {item.durationDays ? <span>{item.durationDays} 天假期</span> : null}
 {item.canBridge ? <span>可拼假</span> : null}
 </div>

 <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
 查看场景页
 <ArrowRight className="h-4 w-4" />
 </Link>
 </article>
 );
}
