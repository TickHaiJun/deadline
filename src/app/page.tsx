"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Sun,
  Moon,
  PartyPopper,
  CalendarDays,
  BookOpen,
  Brain,
  Briefcase,
  Calculator,
  Award,
  Lightbulb,
  Compass,
  Globe,
  Stethoscope,
  Scale,
  Laptop,
  Monitor,
  FileText,
  BadgeCheck,
  Tent,
  Gift,
  Camera,
  Palmtree,
  Music,
  Coffee,
  Sparkles,
  Heart,
  Flag,
  Bookmark,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

dayjs.extend(duration);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

// === 图标与颜色池 ===
const EXAM_ICONS = [
  BookOpen,
  Brain,
  Briefcase,
  Calculator,
  Award,
  Lightbulb,
  Compass,
  Globe,
  Stethoscope,
  Scale,
  Laptop,
  Monitor,
  FileText,
  BadgeCheck,
  Bookmark,
];
const HOLIDAY_ICONS = [
  PartyPopper,
  Tent,
  Gift,
  Camera,
  Palmtree,
  Music,
  Coffee,
  Sparkles,
  Heart,
  Flag,
];
const COLORS = [
  "text-blue-500",
  "text-red-500",
  "text-green-500",
  "text-purple-500",
  "text-pink-500",
  "text-yellow-500",
  "text-cyan-500",
  "text-emerald-500",
  "text-indigo-500",
  "text-rose-500",
  "text-orange-500",
  "text-teal-500",
];

// 将 "4月11日、12日" 解析为 2026-04-11（取第一个日期做锚点）
const parseDate = (dateStr: string) => {
  const match = dateStr.match(/(\d+)月(\d+)日/);
  if (match) {
    const m = match[1].padStart(2, "0");
    const d = match[2].padStart(2, "0");
    return `2026-${m}-${d}`;
  }
  return "2026-12-31";
};

const getHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
};

// 稳定祝福语（不使用 Math.random）
const getBlessingStable = (category: "exam" | "holiday", isExpired: boolean, seed: number) => {
  if (isExpired) {
    return category === "exam"
      ? "关关难过关关过，前路漫漫亦灿灿。"
      : "美好的时光总是短暂，期待下一次相逢。";
  }
  const examBlessings = [
    "逢考必过，前程似锦！",
    "金榜题名，成功上岸！",
    "提笔征战四方，合笔谈笑清风。",
    "乾坤未定，你我皆是黑马！",
    "星光不问赶路人，时光不负有心人。",
  ];
  const holidayBlessings = [
    "假期愉快，身心彻底放松！",
    "去拥抱自然，感受生活的炽热。",
    "与家人团聚，岁岁常欢愉。",
    "丢掉烦恼，尽情享受这一刻！",
    "愿你的假期像阳光一样明媚。",
  ];
  const list = category === "exam" ? examBlessings : holidayBlessings;
  return list[seed % list.length];
};

const rawExams = [
  { name: "2026年上半年中小学教师资格（笔试）", date: "3月7日" },
  { name: "工程咨询（投资）专业技术人员职业资格", date: "4月11日、12日" },
  { name: "卫生专业技术资格（初级、中级）", date: "4月11日、12日、18日、19日、25日、26日" },
  { name: "注册建筑师（一级）", date: "5月16日、17日、23日" },
  { name: "注册建筑师（二级）", date: "5月16日、17日" },
  { name: "会计专业技术资格（高级）", date: "5月16日" },
  { name: "2026年上半年中小学教师资格（面试）", date: "5月16日、17日" },
  { name: "会计专业技术资格（初级）", date: "5月16日—18日" },
  { name: "社会工作者职业资格（初级、中级、高级）", date: "5月23日、24日" },
  { name: "房地产经纪人职业资格", date: "5月23日、24日" },
  { name: "计算机技术与软件专业技术资格", date: "5月23日—26日" },
  { name: "精算师", date: "5月23日—27日" },
  { name: "经济专业技术资格（高级）", date: "5月30日" },
  { name: "演出经纪人员资格", date: "5月30日" },
  { name: "机动车检测维修专业技术人员", date: "6月13日、14日" },
  { name: "翻译专业资格（一、二、三级）", date: "6月27日、28日" },
  { name: "统计专业技术资格（初级、中级、高级）", date: "6月28日" },
  { name: "专利代理师", date: "7月4日、5日" },
  { name: "拍卖师（纸笔作答）", date: "7月12日" },
  { name: "执业兽医（实操操作）", date: "8月29日—31日" },
  { name: "注册会计师（专业阶段）", date: "8月29日、30日" },
  { name: "注册会计师（综合阶段）", date: "8月30日" },
  { name: "2026年下半年中小学教师资格（笔试）", date: "9月12日" },
  { name: "建造师（一级）", date: "9月12日、13日" },
  { name: "审计专业技术资格（初级、中级、高级）", date: "9月19日" },
  { name: "造价工程师（一级）", date: "10月17日、18日" },
  { name: "法律职业资格（主观题）", date: "10月18日" },
  { name: "新闻记者职业资格", date: "10月24日" },
  { name: "公路水运工程试验检测人员", date: "10月24日、25日" },
  { name: "计算机软考（下半年）", date: "10月24日—27日" },
  { name: "精算师（下半年）", date: "10月24日—28日" },
  { name: "执业药师（药学、中药学）", date: "10月31日、11月1日" },
  { name: "注册电气/公用设备/化工/环保工程师", date: "10月31日、11月1日" },
  { name: "注册结构工程师（二级）", date: "11月1日" },
  { name: "注册城乡规划师", date: "11月7日、8日" },
  { name: "税务师", date: "11月14日、15日" },
  { name: "导游资格", date: "11月21日" },
  { name: "2026年下半年中小学教师资格（面试）", date: "12月5日、6日" },
  { name: "证券从业资格（统一）考试", date: "5月16日" },
  { name: "证券从业资格（专场）考试", date: "6月27日、9月19日" },
  { name: "基金从业人员资格考试", date: "5月23日、11月28日" },
];

const rawHolidays = [
  { name: "元旦", date: "1月1日", duration: "3天" },
  { name: "春节", date: "2月15日", duration: "9天" },
  { name: "清明节", date: "4月4日", duration: "3天" },
  { name: "劳动节", date: "5月1日", duration: "5天" },
  { name: "端午节", date: "6月19日", duration: "3天" },
  { name: "中秋节", date: "9月25日", duration: "3天" },
  { name: "国庆节", date: "10月1日", duration: "7天" },
];

const FlipCard = ({ item, category }: { item: any; category: "exam" | "holiday" }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const mounted = useMounted();

  const hash = getHash(item.name);
  const IconList = category === "exam" ? EXAM_ICONS : HOLIDAY_ICONS;
  const IconComponent = IconList[hash % IconList.length];

  const targetDate = dayjs(item.parsedDate);
  const now = mounted ? dayjs() : dayjs("2026-01-01");
  const diffDays = mounted ? targetDate.diff(now, "day") : 0;
  const isExpired = mounted ? diffDays < 0 : false;

  const colorClass = isExpired ? "text-slate-500" : COLORS[hash % COLORS.length];
  const bgGlow = isExpired
    ? "bg-slate-500/10"
    : colorClass.replace("text-", "bg-").replace("500", "500/10");

  const weeks = mounted ? Math.floor(Math.abs(diffDays) / 7) : 0;
  const days = mounted ? Math.abs(diffDays) % 7 : 0;

  const blessing = useMemo(
    () => getBlessingStable(category, isExpired, hash),
    [category, isExpired, hash]
  );

  let tag = "";
  if (!mounted) tag = "加载中";
  else if (isExpired) tag = "已结束";
  else if (diffDays <= 7) tag = "🚨 即将到来";
  else if (diffDays <= 30) tag = "🔥 备战冲刺";
  else tag = `Q${Math.ceil(targetDate.month() / 3)} 目标`;

  return (
    <div
      className="relative w-full h-[260px] cursor-pointer perspective-[1500px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between",
            "bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg",
            mounted && isExpired && "grayscale opacity-70"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <span
                className={cn(
                  "text-[10px] font-bold px-2.5 py-1 rounded-full w-fit",
                  mounted && isExpired
                    ? "bg-slate-200 text-slate-500 dark:bg-slate-800"
                    : "bg-white/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 shadow-sm"
                )}
              >
                {tag}
              </span>

              <h3
                className={cn(
                  "text-base md:text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight",
                  mounted && isExpired && "line-through text-slate-500 dark:text-slate-500"
                )}
              >
                {item.name}
              </h3>
            </div>

            <div className={cn("p-2 rounded-2xl", bgGlow)}>
              <IconComponent className={cn("w-6 h-6", colorClass)} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                {mounted ? (isExpired ? 0 : diffDays) : "--"}
              </span>
              <span className="text-sm text-slate-500 font-medium">天</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {mounted ? (
                <>
                  {isExpired ? "已经过去" : "剩余"}{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">{weeks}</span> 周{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-300">{days}</span> 天
                </>
              ) : (
                "倒计时计算中..."
              )}
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {item.date}
              </span>
              {item.duration && (
                <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  放假 {item.duration}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center",
            "bg-gradient-to-br from-white/80 to-slate-100/80 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl"
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Quote className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-4 opacity-50" />
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{item.name}</h4>
          <p className={cn("text-base font-medium", colorClass)}>"{blessing}"</p>
          <div className="absolute bottom-6 flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-widest">
            <IconComponent size={12} /> {category === "exam" ? "Target 2026" : "Enjoy 2026"}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const mounted = useMounted();

  // ✅ 初始值固定，避免 SSR/CSR mismatch
  const [isDark, setIsDark] = useState(true);

  // ✅ mounted 后读取本地存储并同步 html class
  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem("theme");
    const nextIsDark = saved ? saved === "dark" : true;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
  }, [mounted]);

  // ✅ 切换主题：同步 DOM + 写入 localStorage
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // 数据处理：只按 parsedDate 排序（不引入 dayjs() 当前时间）
  const processData = (data: any[]) =>
    data
      .map((d) => ({ ...d, parsedDate: parseDate(d.date) }))
      .sort((a, b) => dayjs(a.parsedDate).unix() - dayjs(b.parsedDate).unix());

  const sortedExams = useMemo(() => processData(rawExams), []);
  const sortedHolidays = useMemo(() => processData(rawHolidays), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-700 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 光晕背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 dark:bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 dark:bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-2xl bg-white/30 dark:bg-[#0B0F19]/60 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <CalendarDays className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-lg text-slate-800 dark:text-slate-200 hidden sm:block tracking-wide">
              Timeline 2026
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm transition-transform hover:scale-110 active:scale-95 backdrop-blur-md"
            aria-label="toggle theme"
          >
            {/* mounted 前固定一个 icon，避免极端情况下 icon 抖动 */}
            {mounted ? (
              isDark ? <Sun className="text-yellow-400" size={18} /> : <Moon className="text-indigo-600" size={18} />
            ) : (
              <Sun className="text-yellow-400" size={18} />
            )}
          </button>
        </header>

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            2026年度 <br className="md:hidden" />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              重要考证
            </span>
            <span className="mx-2 md:mx-4 text-slate-400 font-light">&</span>
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-rose-500 bg-clip-text text-transparent">
              节假日
            </span>
            <br className="hidden md:block" /> 倒计时
          </motion.h1>
          <p className="mt-6 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            光阴似箭，日月如梭。合理规划你的 2026 年，无论是冲刺人生大考，还是享受闲暇时光，每一天都值得被期待。
          </p>
        </div>

        <main className="max-w-7xl mx-auto px-6 pb-32">
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <PartyPopper className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">法定节假日</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-300 dark:from-slate-800 to-transparent ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedHolidays.map((item, idx) => (
                <FlipCard key={`holiday-${idx}`} item={item} category="holiday" />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <Brain className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">职业资格考试</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-300 dark:from-slate-800 to-transparent ml-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedExams.map((item, idx) => (
                <FlipCard key={`exam-${idx}`} item={item} category="exam" />
              ))}
            </div>
          </section>
        </main>

        <footer className="w-full py-8 text-center border-t border-slate-200/50 dark:border-slate-800/50 bg-white/10 dark:bg-slate-950/50 backdrop-blur-md">
          <div className="inline-flex flex-col gap-2 items-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              @程序员海军 <span className="mx-2 text-slate-300 dark:text-slate-700">|</span>{" "}
              <span className="text-cyan-600 dark:text-cyan-400">

                <a href="https://img2024.cnblogs.com/blog/1654515/202602/1654515-20260224140842561-1851540179.jpg" target="_blank" rel="noopener noreferrer">WeChat: daxin261</a>
              </span>
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-600 tracking-widest uppercase">
              Designed &amp; Coded with passion for 2026
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}