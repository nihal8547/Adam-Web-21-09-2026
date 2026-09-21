import { cn } from "@/lib/cn";

/** 1280px max container with responsive gutters (16px mobile / 24px up). */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6", className)}>{children}</Tag>
  );
}
