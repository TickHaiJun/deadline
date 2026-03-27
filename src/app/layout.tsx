import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteFooter, SiteHeader } from "@/components/shared/site-shell";

const geistSans = localFont({
 src: "./fonts/GeistVF.woff",
 variable: "--font-geist-sans",
 weight: "100 900",
});

const geistMono = localFont({
 src: "./fonts/GeistMonoVF.woff",
 variable: "--font-geist-mono",
 weight: "100 900",
});

export const metadata: Metadata = {
 title: "2026 重要时间节点管理",
 description: "围绕备考与假期两个核心场景，帮助用户更快完成 2026 重要时间节点决策。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
 <html lang="zh-CN" className="dark" suppressHydrationWarning>
 <body className={[geistSans.variable, geistMono.variable, "bg-[var(--background)] text-slate-950 antialiased dark:text-slate-50"].join(" ")}>
 <div className="min-h-screen">
 <SiteHeader />
 {children}
 <SiteFooter />
 </div>
 </body>
 </html>
 );
}
