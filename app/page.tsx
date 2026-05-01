import Link from "next/link"
import { ArrowRight, Zap, Wallet, Globe2, Coins, ShieldCheck } from "lucide-react"
import { SiteNav } from "@/components/site-nav"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav variant="landing" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(153,69,255,0.45), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[560px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(20,241,149,0.35), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Built on Solana · USDC settlements
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Get Paid Globally.
              <br />
              <span className="text-gradient-brand">No Bank. No Middleman.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              SolaPay NG lets Nigerian freelancers receive USDC payments instantly on
              Solana. Send a link, get paid in seconds — from anywhere in the world.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground transition-all hover:opacity-90 glow-purple"
              >
                Get Started
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card/40 px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-card"
              >
                See how it works
              </Link>
            </div>

            {/* social proof strip */}
            <div className="mt-14 grid w-full grid-cols-3 gap-4 border-t border-border pt-8 text-left sm:gap-8">
              <Stat label="Avg. settlement" value="< 2s" />
              <Stat label="Network fee" value="$0.0003" />
              <Stat label="Currencies" value="USDC" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Why SolaPay
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Built for freelancers who can&apos;t wait on banks.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Every part of SolaPay NG is designed around one idea: getting your money
              into your wallet, fast — without permission from anyone.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Feature
              icon={<Zap className="h-5 w-5" aria-hidden="true" />}
              title="Instant Settlement"
              description="USDC lands in your Solana wallet in under 2 seconds — no 3-day bank holds, no clearing windows."
              accent="purple"
            />
            <Feature
              icon={<Coins className="h-5 w-5" aria-hidden="true" />}
              title="Near-Zero Fees"
              description="Pay fractions of a cent per transaction. Keep what you earn instead of losing 5% to processors."
              accent="green"
            />
            <Feature
              icon={<Wallet className="h-5 w-5" aria-hidden="true" />}
              title="No Bank Required"
              description="Skip the BVN drama and wire delays. Just connect a Solana wallet and start receiving payments."
              accent="purple"
            />
          </div>

          {/* secondary row */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <SmallFeature
              icon={<Globe2 className="h-4 w-4" aria-hidden="true" />}
              title="Global by default"
              description="Clients pay from anywhere — US, EU, Asia — no FX hassle."
            />
            <SmallFeature
              icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
              title="Self-custodial"
              description="Funds settle directly to your wallet. We never touch your money."
            />
            <SmallFeature
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              title="One-click invoices"
              description="Generate a payment link in seconds and share anywhere."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to get paid like it&apos;s 2030?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Join Nigerian freelancers already earning in USDC, settling in seconds, and
            keeping every dollar they earn.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-purple"
          >
            Get Started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 SolaPay NG. Made in Lagos.</p>
          <p className="font-mono text-xs">Powered by Solana · USDC</p>
        </div>
      </footer>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  )
}

function Feature({
  icon,
  title,
  description,
  accent,
}: {
  icon: React.ReactNode
  title: string
  description: string
  accent: "purple" | "green"
}) {
  const isPurple = accent === "purple"
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
        style={{
          background: isPurple
            ? "radial-gradient(closest-side, rgba(153,69,255,0.4), transparent)"
            : "radial-gradient(closest-side, rgba(20,241,149,0.35), transparent)",
        }}
      />
      <div
        className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
          isPurple ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"
        }`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function SmallFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-muted-foreground">
          {icon}
        </span>
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
