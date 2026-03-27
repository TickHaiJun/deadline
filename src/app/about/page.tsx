import Image from "next/image";

import { ProjectCard } from "@/components/about/project-card";
import { SectionHeader } from "@/components/shared/section-header";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function AboutPage() {
  return (
    <main className="pb-24">
      <section className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[48px] px-6">
        <div className="glass-panel relative overflow-hidden rounded-[48px]">
          <div className="relative aspect-[16/5] min-h-[220px] w-full">
            <Image src={profile.heroImage} alt={profile.name} fill className="object-cover" priority sizes="100vw" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="glass-panel rounded-[40px] p-8 md:p-10">
            <SectionHeader eyebrow="Profile" title="海军 / TickHaiJun" description={profile.headline} />
            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{profile.intro}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {profile.capabilities.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-white/40 bg-white/55 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Capability</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[40px] p-8 md:p-10">
            <SectionHeader eyebrow="About" title="持续把想法做成产品" />
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Projects" title="代表项目" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="glass-panel relative overflow-hidden rounded-[44px] p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-[-10%] right-[-4%] h-56 w-56 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/10" />
            <div className="absolute left-[12%] top-[-18%] h-44 w-44 rounded-full bg-amber-300/16 blur-3xl dark:bg-amber-400/8" />
          </div>

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_320px] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">合作</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">联系与合作</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                如果你正在做 AI 应用、MVP 验证、产品共创，或者需要有人从方案到落地一起推进，可以直接扫码联系我。
              </p>
            </div>

            <div className="rounded-[34px] border border-white/50 bg-white/72 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/5">
              <div className="overflow-hidden rounded-[24px] bg-white p-3">
                <Image
                  src="https://img2024.cnblogs.com/blog/1654515/202602/1654515-20260224140842561-1851540179.jpg"
                  alt="微信二维码"
                  width={320}
                  height={320}
                  className="h-auto w-full rounded-[18px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
