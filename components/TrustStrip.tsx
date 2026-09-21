import Icon from "@/components/Icon";
import { trustBadges } from "@/content/site";

/** Trust strip: QCDD Certified · NFPA Compliant · UL/FM Equipment · 24/7. */
export default function TrustStrip({ className }: { className?: string }) {
  return (
    <ul
      className={"flex flex-wrap items-center gap-x-6 gap-y-3 " + (className ?? "")}
      aria-label="Certifications and standards"
    >
      {trustBadges.map((badge) => (
        <li
          key={badge}
          className="flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--subheading)]"
        >
          <span className="text-[var(--accent-strong)]">
            <Icon name="check" size={16} />
          </span>
          {badge}
        </li>
      ))}
    </ul>
  );
}
