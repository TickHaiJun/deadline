import { type profile } from "@/data/profile";

type ContactListProps = {
  contacts: typeof profile.contacts;
};

export function ContactList({ contacts }: ContactListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {contacts.map((contact) => {
        const content = (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{contact.label}</p>
            <p className="mt-2 text-lg font-medium text-slate-950">{contact.value}</p>
          </>
        );

        return contact.href ? (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {content}
          </a>
        ) : (
          <div key={contact.label} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            {content}
          </div>
        );
      })}
    </div>
  );
}
