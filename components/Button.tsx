import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "invert";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-[var(--font-display)] font-semibold transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-[1rem]",
};

const variants: Record<Variant, string> = {
  // Gold fill + ink text (NEVER white text on gold — a11y contrast rule).
  primary:
    "bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]",
  secondary:
    "border border-[var(--color-ink-900)] text-[var(--color-ink-900)] hover:bg-[var(--color-ink-900)] hover:text-[var(--color-white)] dark:border-[var(--heading)] dark:text-[var(--heading)]",
  ghost:
    "text-[var(--accent-strong)] hover:text-[var(--color-brand-600)] underline-offset-4 hover:underline",
  invert:
    "bg-[var(--color-white)] text-[var(--color-ink-900)] hover:bg-[var(--color-brand-500)] hover:text-white",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
