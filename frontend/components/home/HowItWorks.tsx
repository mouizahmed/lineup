import { steps } from "./home-data";

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            From discovery to service completion in four clear steps — no
            confusion, no wasted time.
          </p>
        </div>

        <ol className="relative border-l border-border">
          {steps.map(({ number, title, description }) => (
            <li key={number} className="mb-10 ml-6">
              <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-foreground">
                {number}
              </span>
              <h3 className="mb-1 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
