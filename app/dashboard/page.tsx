"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Check, Copy, Plus, TrendingUp, Wallet, Receipt } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { freelancer, recentPayments, shortAddress } from "@/lib/mock-data"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const { connected, publicKey } = useWallet()

  const copyAddress = async () => {
    try {
      const address = publicKey ? publicKey.toString() : freelancer.walletAddress
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  const displayAddress = publicKey ? publicKey.toString() : freelancer.walletAddress

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav variant="app" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Wallet Connect Banner */}
        {!connected && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4">
            <div>
              <p className="font-semibold text-accent">Connect your Solana wallet</p>
              <p className="text-xs text-muted-foreground mt-1">Connect Phantom or Solflare to start receiving payments</p>
            </div>
            <WalletMultiButton style={{}} />
          </div>
        )}

        {/* Profile + Create CTA */}
        <section className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-5">
            <div>
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #9945FF 0%, #14F195 100%)" }}
              >
                {freelancer.name.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Welcome back</p>
              <h1 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">
                {connected ? shortAddress(displayAddress, 6) : freelancer.name}
              </h1>
              <button
                onClick={copyAddress}
                className="mt-2 inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1 text-xs"
                aria-label="Copy wallet address"
              >
                <Wallet className="h-3 w-3" aria-hidden="true" />
                {shortAddress(displayAddress, 6)}
                {copied ? (
                  <Check className="h-3 w-3 text-accent" aria-hidden="true" />
                ) : (
                  <Copy className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Create Payment Link
          </Link>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total earnings"
            value={`$${freelancer.totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sub="USDC"
            icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
            accent="green"
            primary
          />
          <StatCard
            label="Payments received"
            value={freelancer.paymentsCount.toString()}
            sub="Lifetime"
            icon={<Receipt className="h-4 w-4" aria-hidden="true" />}
          />
          <StatCard
            label="Average payment"
            value={`$${freelancer.avgPayment.toFixed(2)}`}
            sub="USDC / invoice"
            icon={<Wallet className="h-4 w-4" aria-hidden="true" />}
          />
        </section>

        {/* Recent payments */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight sm:text-lg">Recent payments</h2>
              <p className="text-xs text-muted-foreground">Settled directly to your Solana wallet</p>
            </div>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">
              {recentPayments.length} this month
            </span>
          </header>

          <ul role="list" className="divide-y divide-border">
            {recentPayments.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-secondary/40"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.client}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.service}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-6 text-right">
                  <div className="hidden font-mono text-xs text-muted-foreground sm:block">
                    {p.txHash}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">+${p.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

function StatCard({
  label, value, sub, icon, accent, primary = false,
}: {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  accent?: "green" | "purple"
  primary?: boolean
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-card p-5 ${primary ? "border-accent/30" : "border-border"}`}>
      {primary && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(20,241,149,0.35), transparent)" }}
        />
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        <span className={`flex h-7 w-7 items-center justify-center rounded-md ${accent === "green" ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"}`}>
          {icon}
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  )
}