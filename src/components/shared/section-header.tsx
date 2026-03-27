type SectionHeaderProps = {  
  eyebrow?: string;  
  title: string;  
  description?: string;  
};  
  
export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {  
  return (  
    <div className="max-w-2xl">  
      {eyebrow ? (  
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">{eyebrow}</p>  
      ) : null}  
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>  
      {description ? <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}  
    </div>  
  );  
}  
