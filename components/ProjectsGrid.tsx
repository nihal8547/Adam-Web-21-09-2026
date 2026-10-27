"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sectors, type Project } from "@/content/projects";
import Icon from "@/components/Icon";
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
              className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/60 hover:shadow-xl hover:shadow-slate-200/80"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="rounded-full bg-[var(--color-navy-900)]/90 backdrop-blur-md px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-amber-400 border border-amber-400/30 shadow-md">
                    {p.sector}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>{p.service}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[var(--color-brand-600)] transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{p.summary}</p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{p.location}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-navy-900)] group-hover:text-amber-500 transition-colors">
                    <span>View Project</span>
                    <Icon name="arrow-right" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
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
              ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white"
              : "border-[var(--border)] text-[var(--subheading)] hover:border-[var(--accent)]",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
