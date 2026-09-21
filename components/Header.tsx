import Container from "@/components/Container";
import Logo from "@/components/Logo";
import PrimaryNav from "@/components/PrimaryNav";
import Icon from "@/components/Icon";
import { site } from "@/content/site";

/**
 * Sticky site header. Server component shell: top utility bar (phone + 24/7
 * emergency chip + email), then the main bar with logo, interactive nav and CTA.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)]">
      {/* Utility bar */}
      <div className="border-b border-[var(--border)] bg-[var(--color-ink-900)] text-[var(--on-invert)]">
        <Container className="flex h-9 items-center justify-between gap-4 text-[0.8rem]">
          <div className="flex items-center gap-4">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--on-invert-accent)]"
            >
              <Icon name="phone" size={15} />
              <span className="font-medium">{site.phone.display}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-[var(--on-invert-accent)] sm:inline-flex"
            >
              <Icon name="mail" size={15} />
              <span>{site.email}</span>
            </a>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-alert-600)] px-2.5 py-0.5 text-[0.72rem] font-semibold uppercase tracking-wide text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            24/7 Emergency
          </span>
        </Container>
      </div>

      {/* Main bar */}
      <div className="border-b border-[var(--border)] shadow-[var(--shadow-card)]">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-3">
            <PrimaryNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
