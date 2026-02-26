export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm font-semibold text-foreground">LineUp</p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Group 1 &mdash; EECS 4314. All
          rights reserved.
        </p>
        <nav className="flex gap-4 text-xs text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#use-cases" className="transition-colors hover:text-foreground">
            Use cases
          </a>
        </nav>
      </div>
    </footer>
  );
}
