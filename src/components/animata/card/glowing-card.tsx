'use client'
import React from "react";
interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Starting gradient color.
   */
  fromColor?: string;
  /**
   * Middle gradient color.
   */
  viaColor?: string;
  /**
   * Ending gradient color.
   */
  toColor?: string;
  label: string;
  time: string;
  remainingWeek?: string;
  remainingTime?: string;
}

export default function GlowingCard({
  fromColor = "#ede4d3",
  viaColor = "#c4bcab",
  toColor = "#ffd299",
  label,
  time,
  remainingWeek,
  remainingTime,
}: GlowCardProps) {
  return (
    <div
      className="rounded-3xl bg-gradient-to-r p-0.5 hover:shadow-glow hover:brightness-150"
      style={{
        transition: " box-shadow 0.5s ease",
        backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
      }}
    >
      <div
        className="blur-20 inset-0 h-full w-full rounded-3xl bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70]"
        style={{ transition: "filter 0.5s ease" }}
      />
       <div className="flex h-64 w-56 flex-col gap-2 rounded-3xl  p-4">
        <div className="mb-2 text-xl font-bold text-red-700">{label}</div>
        <div className="flex-1 text-sm font-medium text-red-700 text-opacity-80">
          <p>时间: {time}</p>
          <p>剩余: {remainingWeek}</p>
          <p>剩余时间: {remainingTime}</p>
        </div>
      </div>
    </div>
  );
}
