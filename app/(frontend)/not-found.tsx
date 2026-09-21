import Container from "@/components/Container";
import { Button } from "@/components/Button";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">Error 404</span>
      <h1 className="mt-3 text-[length:var(--text-5xl)] text-[var(--heading)]">Page not found</h1>
      <p className="mt-4 max-w-md text-[var(--body)]">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has moved. Try one of our main
        services, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/contact-us" variant="secondary">
          Contact Us
        </Button>
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {services.slice(0, 6).map((s) => (
          <li key={s.slug}>
            <a
              href={`/${s.slug}`}
              className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[0.85rem] text-[var(--subheading)] transition-colors hover:border-[var(--accent)]"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
