import Link from "next/link";

export type QuickEntryItem = {
 label: string;
 href: string;
};

type QuickEntryListProps = {
 title: string;
 items: QuickEntryItem[];
};

export function QuickEntryList({ title, items }: QuickEntryListProps) {
 return (
 <div className="glass-panel rounded-[28px] p-6">
 <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
 <div className="mt-4 flex flex-wrap gap-3">
 {items.map((item) => (
 <Link
 key={item.label}
 href={item.href}
 className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 dark:hover:text-white"
 >
 {item.label}
 </Link>
 ))}
 </div>
 </div>
 );
}
