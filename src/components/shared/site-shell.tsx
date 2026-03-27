"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
 { href: "/", label: "首页" },
 { href: "/exam", label: "备考模式" },
 { href: "/holiday", label: "假期模式" },
 { href: "/about", label: "关于我" },
];

export function SiteHeader() {
 const pathname = usePathname();
 const [mounted, setMounted] = useState(false);
 const [isDark, setIsDark] = useState(true);

 useEffect(() => {
 setMounted(true);
 const saved = window.localStorage.getItem("theme");
 const shouldDark = saved ? saved === "dark" : true;
 setIsDark(shouldDark);
 document.documentElement.classList.toggle("dark", shouldDark);
 }, []);

 function handleToggle() {
 const next = !isDark;
 setIsDark(next);
 document.documentElement.classList.toggle("dark", next);
 window.localStorage.setItem("theme", next ? "dark" : "light");
 }

 return (
 <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
 <div className="glass-panel mx-auto max-w-6xl rounded-[30px] border border-white/12 bg-[rgba(12,16,26,0.68)] px-5 py-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] dark:bg-[rgba(10,13,22,0.62)] sm:px-6">
 <div className="flex items-center justify-between gap-4">
 <Link href="/" className="flex items-center gap-3">
 <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#dbeafe_0%,#93c5fd_20%,#60a5fa_44%,#34d399_72%,#fde68a_100%)] text-slate-950 shadow-[0_18px_48px_rgba(56,189,248,0.24)]">
 <CalendarDays className="h-5 w-5" />
 </span>
 <span className="flex flex-col">
 <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Timeline 2026</span>
 <span className="text-base font-semibold text-slate-950 dark:text-white">重要时间节点</span>
 </span>
 </Link>

 <div className="flex items-center gap-3">
 <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/55 px-2 py-1 backdrop-blur-xl dark:bg-white/5 md:flex">
 {navItems.map((item) => {
 const active = pathname === item.href;
 return (
 <Link
 key={item.href}
 href={item.href}
 className={active ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] dark:bg-white dark:text-slate-950" : "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}
 >
 {item.label}
 </Link>
 );
 })}
 </nav>

 <button
 type="button"
 onClick={handleToggle}
 className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/65 text-slate-700 transition hover:-translate-y-0.5 hover:text-slate-950 dark:bg-white/7 dark:text-slate-200 dark:hover:text-white"
 aria-label="切换主题"
 >
 {mounted && isDark ? <SunMedium className={'h-4.5 w-4.5'} /> : <MoonStar className={'h-4.5 w-4.5'} />}
 </button>
 </div>
 </div>

 <nav className="mt-4 flex flex-wrap gap-2 md:hidden">
 {navItems.map((item) => {
 const active = pathname === item.href;
 return (
 <Link
 key={item.href}
 href={item.href}
 className={active ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950" : "rounded-full border border-white/12 bg-white/55 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"}
 >
 {item.label}
 </Link>
 );
 })}
 </nav>
 </div>
 </header>
 );
}

export function SiteFooter() {
 return (
 <footer className="px-4 pb-8 pt-6 sm:px-6">
 <div className="glass-panel mx-auto grid max-w-6xl gap-8 rounded-[34px] px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-8">
 <div>
 <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Timeline 2026</p>
 <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">备考与假期，放在同一条时间线上看。</h2>
 <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">默认 Dark 主题。进入页面后直接按标签查看当前还有效的节点。</p>
 </div>
 <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
 <Link href="/exam" className="rounded-2xl border border-white/10 bg-white/55 px-4 py-3 transition hover:-translate-y-0.5 dark:bg-white/5">备考模式</Link>
 <Link href="/holiday" className="rounded-2xl border border-white/10 bg-white/55 px-4 py-3 transition hover:-translate-y-0.5 dark:bg-white/5">假期模式</Link>
 <Link href="/about" className="rounded-2xl border border-white/10 bg-white/55 px-4 py-3 transition hover:-translate-y-0.5 dark:bg-white/5">关于我</Link>
 </div>
 </div>
 </footer>
 );
}
