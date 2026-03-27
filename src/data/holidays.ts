export type HolidayItem = {
  name: string;
  date: string;
  durationDays: number;
  canBridge: boolean;
  rhythm: "上半年" | "下半年";
  travelType: "短途" | "长途" | "家庭团聚";
  summary: string;
};

export const holidays: HolidayItem[] = [
  {
    name: "元旦",
    date: "1月1日",
    durationDays: 3,
    canBridge: false,
    rhythm: "上半年",
    travelType: "短途",
    summary: "适合用来切换节奏，做年初短途休整或城市内放松。",
  },
  {
    name: "春节",
    date: "2月15日",
    durationDays: 9,
    canBridge: true,
    rhythm: "上半年",
    travelType: "家庭团聚",
    summary: "全年最长假期之一，更适合返乡团聚或长线出行安排。",
  },
  {
    name: "清明节",
    date: "4月4日",
    durationDays: 3,
    canBridge: false,
    rhythm: "上半年",
    travelType: "短途",
    summary: "适合周边踏青和短途出行，决策成本低。",
  },
  {
    name: "劳动节",
    date: "5月1日",
    durationDays: 5,
    canBridge: true,
    rhythm: "上半年",
    travelType: "长途",
    summary: "上半年最适合做旅行安排的公共假期之一。",
  },
  {
    name: "端午节",
    date: "6月19日",
    durationDays: 3,
    canBridge: false,
    rhythm: "上半年",
    travelType: "短途",
    summary: "适合短途放松和阶段性恢复，不建议大规模跨城拥挤出行。",
  },
  {
    name: "中秋节",
    date: "9月25日",
    durationDays: 3,
    canBridge: false,
    rhythm: "下半年",
    travelType: "家庭团聚",
    summary: "更适合回家、团聚和节奏调整。",
  },
  {
    name: "国庆节",
    date: "10月1日",
    durationDays: 7,
    canBridge: true,
    rhythm: "下半年",
    travelType: "长途",
    summary: "下半年最长公共假期，适合长线旅行和家庭安排。",
  },
];
