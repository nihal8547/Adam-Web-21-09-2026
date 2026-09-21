import Reveal from "@/components/Reveal";

export type ProcessStep = { title: string; desc: string };

/**
 * Numbered process timeline (Consultation → Design → Installation → AMC).
 * Horizontal on desktop with a connecting rule, stacked on mobile.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 80} className="relative">
          <div className="flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
            <span
              aria-hidden
              className="font-[var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-brand-500)]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[1.1rem] font-semibold text-[var(--heading)]">{step.title}</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--body)]">{step.desc}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
