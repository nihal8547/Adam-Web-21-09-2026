import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Image-based logo. Replace /logo.png in the public folder to update.
 */
export default function Logo({
  invert = false,
  className,
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Adam Technical Services W.L.L. — home"
      className={cn("inline-flex items-center gap-1.5 group", className)}
    >
      <Image 
        src="/logo.png" 
        alt="Adam Technical Services W.L.L. Logo" 
        width={120} 
        height={40} 
        className={cn("object-contain transition-all", invert && "brightness-0 invert")}
        style={{ width: "auto", height: "auto" }}
        priority
      />
      <span
        className={cn(
          "text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border leading-none self-end mb-1 transition-colors",
          invert
            ? "text-amber-400 border-amber-400/40 bg-amber-400/10"
            : "text-[var(--color-brand-600)] border-[var(--color-brand-600)]/30 bg-[var(--color-brand-50)]"
        )}
      >
        W.L.L.
      </span>
    </Link>
  );
}
