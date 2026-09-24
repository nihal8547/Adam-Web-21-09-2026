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
      aria-label="Adam Technical Services — home"
      className={cn("inline-flex items-center", className)}
    >
      <Image 
        src="/logo.png" 
        alt="Adam Technical Services Logo" 
        width={120} 
        height={40} 
        className={cn("object-contain", invert && "brightness-0 invert")}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </Link>
  );
}
