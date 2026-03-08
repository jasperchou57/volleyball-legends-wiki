import Link from "next/link";

type NextStepAction = {
  href: string;
  title: string;
  description: string;
};

type NextStepPanelProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions: NextStepAction[];
};

export function NextStepPanel({
  eyebrow = "Next step",
  title,
  description,
  actions,
}: NextStepPanelProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-border bg-surface/80 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-heading font-bold text-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">{description}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-3xl border border-white/10 bg-background/65 p-5 transition hover:border-white/20"
          >
            <h3 className="text-lg font-heading font-bold text-white">{action.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{action.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
