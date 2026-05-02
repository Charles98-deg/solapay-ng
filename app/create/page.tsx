"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Check, Copy, Link2, Sparkles } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { freelancer } from "@/lib/mock-data"

type GeneratedLink = {
  id: string
  url: string
  freelancer: string
  service: string
  amount: number
}

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

export default function CreatePaymentLinkPage() {
  const [name, setName] = useState(freelancer.name)
  const [service, setService] = useState("")
  const [amount, setAmount] = useState<string>("")
  const [generated, setGenerated] = useState<GeneratedLink | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!service.trim() || !amount || Number(amount) <= 0 || !name.trim()) return

    const id = makeId()
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    setGenerated({
      id,
      url: `${origin}/pay/${id}?name=${encodeURIComponent(name)}&service=${encodeURIComponent(
        service,
      )}&amount=${encodeURIComponent(amount)}&wallet=${encodeURIComponent(freelancer.walletAddress)}`,
      freelancer: name,
      service,
      amount: Number(amount),
    })
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!generated) return
    try {
      await navigator.clipboard.writeText(generated.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  const reset = () => {
    setGenerated(null)
    setService("")
    setAmount("")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav variant="app" />

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to dashboard
        </Link>

        <div className="mt-6">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
            New invoice
          </span>
          <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Create a payment link
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Fill in the details and we&apos;ll generate a shareable USDC payment link your
            client can pay from anywhere.
          </p>
        </div>

        {!generated ? (
          <form
            onSubmit={handleGenerate}
            className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <Field label="Freelancer name" htmlFor="name">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adaeze Okafor"
                required
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>

            <Field
              label="Service description"
              htmlFor="service"
              hint="What is this invoice for?"
            >
              <textarea
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Landing page redesign — 3 revisions included"
                required
                rows={3}
                className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>

            <Field label="Amount" htmlFor="amount" hint="Charged in USDC">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-4 flex items-center text-muted-foreground"
                >
                  $
                </span>
                <input
                  id="amount"
                  type="number"
                  inputMode="decimal"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500.00"
                  required
                  className="w-full rounded-lg border border-border bg-input px-4 py-3 pl-8 pr-20 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <span className="absolute inset-y-0 right-4 flex items-center font-mono text-xs text-muted-foreground">
                  USDC
                </span>
              </div>
            </Field>

            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <p>
                Funds settle directly to your wallet ending in{" "}
                <span className="font-mono text-foreground">
                  {freelancer.walletAddress.slice(-6)}
                </span>
                . SolaPay never holds your money.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-purple"
            >
              <Link2 className="h-4 w-4" aria-hidden="true" />
              Generate payment link
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl border border-accent/30 bg-card p-6 sm:p-8 glow-green">
              <div className="flex items-center gap-2 text-accent">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-[0.16em]">
                  Link generated
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-sm text-muted-foreground">Invoice for</p>
                <p className="text-base font-medium">{generated.service}</p>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  ${generated.amount.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-muted-foreground">USDC</span>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-input px-4 py-3">
                  <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {generated.url}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    copied
                      ? "bg-accent text-accent-foreground"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      Copy link
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={generated.url.replace(
                  typeof window !== "undefined" ? window.location.origin : "",
                  "",
                )}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Preview client view
              </Link>
              <button
                onClick={reset}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Create another
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  )
}
