"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sectors, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Filterable projects grid — filter by sector and by service. Client component
 * (interactive filters). Projects are passed from the server (CMS or content);
 * filtering only hides/shows client-side.
 */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [sector, setSector] = useState<string>("All");
  const [service, setService] = useState<string>("All");

  const serviceOptions = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.service).filter(Boolean)))],
    [projects],
  );

  const filtered = projects.filter(
    (p) =>
      (sector === "All" || p.sector === sector) && (service === "All" || p.service === service),
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <FilterRow
          label="Sector"
          value={sector}
          options={["All", ...sectors]}
          onChange={setSector}
        />
        <FilterRow label="Service" value={service} options={serviceOptions} onChange={setService} />
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[var(--surface-wash)] px-2.5 py-0.5 text-[0.72rem] font-semibold uppercase tracking-wide text-[var(--accent-strong)]">
                    {p.sector}
                  </span>
                  <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[0.72rem] font-medium text-[var(--body)]">
                    {p.service}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.1rem] font-semibold text-[var(--heading)]">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9rem] text-[var(--body)]">{p.summary}</p>
                <span className="mt-3 text-[0.8rem] text-[var(--body)]">{p.location}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-[var(--body)]">
          No projects match those filters yet. Try a different combination.
        </p>
      ) : null}
    </div>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[0.8rem] font-semibold uppercase tracking-wide text-[var(--body)]">
        {label}:
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-[0.85rem] font-medium transition-colors",
            value === opt
              ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-[var(--color-ink-900)]"
              : "border-[var(--border)] text-[var(--subheading)] hover:border-[var(--accent)]",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
