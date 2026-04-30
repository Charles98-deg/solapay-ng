import Link from "next/link"

export function SiteNav({ variant = "landing" }: { variant?: "landing" | "app" }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
            }}
          >
            <span className="font-bold text-background">S</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            SolaPay <span className="text-muted-foreground">NG</span>
          </span>
        </Link>

        {variant === "landing" ? (
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="#features"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open App
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/create"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Create Link
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-mono text-xs text-muted-foreground">7xKX...gAsU</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
