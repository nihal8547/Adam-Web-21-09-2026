"use client";

import { useEffect } from "react";
import Container from "@/components/Container";
import { ButtonEl, Button } from "@/components/Button";

/** Global error boundary (500). Must be a client component. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">Error 500</span>
      <h1 className="mt-3 text-[length:var(--text-4xl)] text-[var(--heading)]">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-[var(--body)]">
        An unexpected error occurred. Please try again, or contact us if the problem continues.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonEl onClick={reset}>Try again</ButtonEl>
        <Button href="/" variant="secondary">
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
