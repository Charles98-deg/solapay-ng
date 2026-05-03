"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowUpRight, Check, Copy, Plus, TrendingUp, Wallet, Receipt } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { shortAddress } from "@/lib/mock-data"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

type TxItem = {
  id: string
  signature: string
  amount: number
  date: string
}

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [transactions, setTransactions] = useState<TxItem[]>([])
  const [loading, setLoading] = useState(false)
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()

  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(null)
      setTransactions([])
      return
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const bal = await connection.getBalance(publicKey)
        setBalance(bal / LAMPORTS_PER_SOL)

        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 })

        const txItems: TxItem[] = signatures.map((sig, i) => ({
          id: i.toString(),
          signature: sig.signature,
          amount: 0,
          date: sig.blockTime
            ? new Date(sig.blockTime * 1000).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Unknown date",
        }))

        setTransactions(txItems)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [connected, publicKey, connection])

  const copyAddress = async () => {
    if (!publicKey) return
    try {
      await navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav variant="app" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {!connected && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4">
            <div>
              <p className="font-semibold text-accent">Connect your Solana wallet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Connect Phantom or Solflare to start receiving payments
              </p>
            </div>
            <WalletMultiButton style={{}} />
          </div>
        )}

        <section className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-5">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-black font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #9945FF 0%, #14F195 100%)" }}
            >
              {publicKey ? publicKey.toString().slice(0, 2).toUpperCase() : "?"}
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Welcome back
              </p>
              <h1 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">
                {publicKey ? shortAddress(publicKey.toString(), 6) : "Not connected"}
              </h1>
              {publicKey && (
                <button
                  onClick={copyAddress}
                  className="mt-2 inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1 text-xs"
                >
                  <Wallet className="h-3 w-3" />
                  {shortAddress(publicKey.toString(), 6)}
                  {copied ? (
                    <Check className="h-3 w-3 text-accent" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              )}
            </div>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black"
          >
            <Plus className="h-4 w-4" />
            Create Payment Link
          </Link>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="SOL Balance"
            value={balance !== null ? `${balance.toFixed(4)} SOL` : connected ? "Loading..." : "—"}
            sub="Devnet"
            icon={<TrendingUp className="h-4 w-4" />}
            accent="green"
            primary
          />
          <StatCard
            label="Transactions"
            value={connected ? transactions.length.toString() : "—"}
            sub="Last 10 on-chain"
            icon={<Receipt className="h-4 w-4" />}
          />
          <StatCard
            label="Wallet"
            value={publicKey ? shortAddress(publicKey.toString(), 4) : "—"}
            sub="Connected"
            icon={<Wallet className="h-4 w-4" />}
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight sm:text-lg">
                Recent transactions
              </h2>
              <p className="text-xs text-muted-foreground">
                On-chain activity for your wallet
              </p>
            </div>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">
              {transactions.length} found
            </span>
          </header>

          {!connected && (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">
              Connect your wallet to see transaction history
            </div>
          )}

          {connected && loading && (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">
              Loading transactions...
            </div>
          )}

          {connected && !loading && transactions.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">
              No transactions yet. Create a payment link to get started.
            </div>
          )}

          {connected && !loading && transactions.length > 0 && (
            <ul role="list" className="divide-y divide-border">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/40"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {tx.signature.slice(0, 20)}...
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  
                    <span className="text-xs text-purple-400 shrink-0">
                    {tx.signature.slice(0, 8)}...
                  </span>
                </li>
              ))}
            </ul>
          )}
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