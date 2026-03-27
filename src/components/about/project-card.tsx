import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { type ProjectItem } from "@/data/projects";

type ProjectCardProps = {
 project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
 return (
 <article className="glass-panel overflow-hidden rounded-[32px]">
 <div className="relative h-56 overflow-hidden">
 <Image
 src={project.cover}
 alt={project.title}
 fill
 className="object-cover"
 sizes="(min-width: 768px) 50vw, 100vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-slate-950/5 to-transparent" />
 </div>
 <div className="p-6">
 <div className="flex items-start justify-between gap-4">
 <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3>
 <a
 href={project.href}
 target="_blank"
 rel="noreferrer"
 className="text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
 >
 <ArrowUpRight className="h-5 w-5" />
 </a>
 </div>
 <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
 <div className="mt-5 flex flex-wrap gap-2">
 {project.tags.map((tag) => (
 <span key={tag} className="rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
 {tag}
 </span>
 ))}
 </div>
 </div>
 </article>
 );
}
