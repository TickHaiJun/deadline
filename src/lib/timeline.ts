import dayjs from "dayjs";

import { exams } from "@/data/exams";
import { holidays } from "@/data/holidays";

export type TimelineKind = "exam" | "holiday";

export type TimelineCardItem = {
  id: string;
  name: string;
  date: string;
  summary: string;
  kind: TimelineKind;
  category?: string;
  tags: string[];
  daysLeft: number;
  dateValue: string;
  durationDays?: number;
  canBridge?: boolean;
};

export function parseDate(dateText: string) {
  const match = dateText.match(/(\d+)月(\d+)日/);
  if (!match) {
    return "2026-12-31";
  }

  const month = match[1].padStart(2, "0");
  const day = match[2].padStart(2, "0");
  return `2026-${month}-${day}`;
}

export function getSortedExamCards() {
  return exams
    .map((item) => {
      const dateValue = parseDate(item.date);
      return {
        id: `exam-${item.name}`,
        name: item.name,
        date: item.date,
        summary: item.summary,
        kind: "exam" as const,
        category: item.category,
        tags: item.tags,
        daysLeft: dayjs(dateValue).diff(dayjs(), "day"),
        dateValue,
      };
    })
    .sort((left, right) => dayjs(left.dateValue).valueOf() - dayjs(right.dateValue).valueOf());
}

export function getSortedHolidayCards() {
  return holidays
    .map((item) => {
      const dateValue = parseDate(item.date);
      return {
        id: `holiday-${item.name}`,
        name: item.name,
        date: item.date,
        summary: item.summary,
        kind: "holiday" as const,
        tags: [item.rhythm, item.travelType, item.canBridge ? "可拼假" : "节奏休整"],
        daysLeft: dayjs(dateValue).diff(dayjs(), "day"),
        dateValue,
        durationDays: item.durationDays,
        canBridge: item.canBridge,
      };
    })
    .sort((left, right) => dayjs(left.dateValue).valueOf() - dayjs(right.dateValue).valueOf());
}

export function getUpcomingItems(daysWindow = 90) {
  return [...getSortedHolidayCards(), ...getSortedExamCards()]
    .filter((item) => item.daysLeft >= 0 && item.daysLeft <= daysWindow)
    .sort((left, right) => left.daysLeft - right.daysLeft);
}

export function getHomepageHighlights() {
  const nextHoliday = getSortedHolidayCards().find((item) => item.daysLeft >= 0);
  const nextHotExam = getSortedExamCards().find((item) => {
    const source = exams.find((exam) => `exam-${exam.name}` === item.id);
    return item.daysLeft >= 0 && source?.heat;
  });
  const nextImportant = getUpcomingItems(30)[0];

  return [nextHoliday, nextHotExam, nextImportant]
    .filter(Boolean)
    .filter((item, index, list) => list.findIndex((entry) => entry?.id === item?.id) === index) as TimelineCardItem[];
}
