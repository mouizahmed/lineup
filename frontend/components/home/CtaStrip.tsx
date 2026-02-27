import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaStrip() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card px-8 py-16 text-center shadow-sm">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to ditch the wait?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
          Create an account and join your first queue in under a minute. No
          credit card required.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/register">
              Get Started Free
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/login">
              Already have an account? Sign in
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
