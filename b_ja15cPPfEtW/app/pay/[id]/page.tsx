"use client"

import Link from "next/link"
import { Suspense, use, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Loader2, Lock, ShieldCheck, Wallet } from "lucide-react"
import { freelancer, samplePaymentLink, shortAddress } from "@/lib/mock-data"

type Status = "idle" | "connecting" | "confirming" | "success"

export default function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(153,69,255,0.45), transparent 70%)",
        }}
      />

      <header className="relative border-b border-border/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "linear-gradient(135deg, #9945FF 0%, #14F195 100%)" }}
            >
              <span className="font-bold text-background">S</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              SolaPay <span className="text-muted-foreground">NG</span>
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Secure checkout
          </span>
        </div>
      </header>

      <Suspense fallback={<PaymentSkeleton id={id} />}>
        <PaymentContent id={id} />
      </Suspense>
    </main>
  )
}

function PaymentContent({ id }: { id: string }) {
  const search = useSearchParams()

  const name = search.get("name") || samplePaymentLink.freelancer
  const service = search.get("service") || samplePaymentLink.service
  const amountParam = Number(search.get("amount"))
  const amount =
    !Number.isNaN(amountParam) && amountParam > 0 ? amountParam : samplePaymentLink.amount

  const [status, setStatus] = useState<Status>("idle")

  const handlePay = async () => {
    setStatus("connecting")
    await wait(900)
    setStatus("confirming")
    await wait(1400)
    setStatus("success")
  }

  return (
    <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Invoice · {id}
        </span>
        <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
          Payment request from <span className="text-gradient-brand">{name}</span>
        </h1>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {/* Amount block */}
        <div className="border-b border-border bg-secondary/30 p-6 text-center sm:p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Amount due
          </p>
          <div className="mt-3 flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold tracking-tight sm:text-6xl">
              ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span className="font-mono text-sm text-muted-foreground">USDC</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            ≈ ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD ·
            Solana network
          </p>
        </div>

        <dl className="divide-y divide-border">
          <Row label="To" value={name} />
          <Row label="For" value={service} />
          <Row
            label="Wallet"
            value={
              <span className="font-mono text-xs">
                {shortAddress(freelancer.walletAddress, 6)}
              </span>
            }
          />
          <Row
            label="Network fee"
            value={<span className="text-accent">~$0.0003</span>}
          />
        </dl>

        <div className="space-y-3 p-6 sm:p-8">
          {status !== "success" ? (
            <button
              onClick={handlePay}
              disabled={status !== "idle"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 glow-purple"
            >
              {status === "idle" && (
                <>
                  <SolanaMark />
                  Pay with Solana
                </>
              )}
              {status === "connecting" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Connecting wallet…
                </>
              )}
              {status === "confirming" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Confirming on Solana…
                </>
              )}
            </button>
          ) : (
            <SuccessState amount={amount} name={name} />
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Self-custodial · Funds go directly to {name.split(" ")[0]}&apos;s wallet
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card/60 p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Compatible wallets
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["Phantom", "Solflare", "Backpack"].map((w) => (
            <div
              key={w}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5 text-xs text-muted-foreground"
            >
              <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
              {w}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Powered by{" "}
        <Link href="/" className="text-foreground underline-offset-4 hover:underline">
          SolaPay NG
        </Link>
      </p>
    </section>
  )
}

function PaymentSkeleton({ id }: { id: string }) {
  return (
    <section className="relative mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="text-center text-xs uppercase tracking-[0.16em] text-muted-foreground">
        Invoice · {id}
      </div>
      <div className="mt-8 h-72 animate-pulse rounded-2xl border border-border bg-card" />
    </section>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 px-6 py-4 sm:px-8">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-medium">{value}</dd>
    </div>
  )
}

function SuccessState({ amount, name }: { amount: number; name: string }) {
  return (
    <div className="rounded-xl border border-accent/40 bg-accent/5 p-5 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Check className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-3 text-base font-semibold">Payment sent</p>
      <p className="mt-1 text-sm text-muted-foreground">
        ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} USDC is on its way
        to {name}.
      </p>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        tx: 5KJp9sZ2xNmQ4hAvR3...9aBc
      </p>
    </div>
  )
}

function SolanaMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 17.5l3-3h13l-3 3H4zM4 6.5l3-3h13l-3 3H4zM20 12l-3-3H4l3 3h13z"
        fill="currentColor"
      />
    </svg>
  )
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
