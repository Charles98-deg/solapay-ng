export type Payment = {
  id: string
  client: string
  service: string
  amount: number
  date: string
  status: "completed" | "pending"
  txHash: string
}

export type PaymentLink = {
  id: string
  freelancer: string
  service: string
  amount: number
  walletAddress: string
}

export const freelancer = {
  name: "Adaeze Okafor",
  handle: "@adaeze.sol",
  walletAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  totalEarnings: 4287.5,
  paymentsCount: 23,
  avgPayment: 186.41,
}

export const recentPayments: Payment[] = [
  {
    id: "pay_01",
    client: "Lumen Studios",
    service: "Brand identity design",
    amount: 850,
    date: "2 hours ago",
    status: "completed",
    txHash: "5KJp...9aBc",
  },
  {
    id: "pay_02",
    client: "Northwind LLC",
    service: "Landing page development",
    amount: 1200,
    date: "Yesterday",
    status: "completed",
    txHash: "3FmQ...2xYz",
  },
  {
    id: "pay_03",
    client: "Atlas Crypto",
    service: "Twitter content (4 weeks)",
    amount: 600,
    date: "3 days ago",
    status: "completed",
    txHash: "9RtN...7kLp",
  },
  {
    id: "pay_04",
    client: "Verve Co.",
    service: "Logo redesign",
    amount: 350,
    date: "Last week",
    status: "completed",
    txHash: "2HsM...4vWq",
  },
  {
    id: "pay_05",
    client: "Mosaic Labs",
    service: "Frontend bug fixes",
    amount: 220,
    date: "Last week",
    status: "completed",
    txHash: "8DjK...1nPo",
  },
]

// Mock store for payment links generated in this session.
// Persisted only in-memory; resets on full reload.
export const samplePaymentLink: PaymentLink = {
  id: "demo",
  freelancer: "Adaeze Okafor",
  service: "Website redesign — homepage + 3 inner pages",
  amount: 750,
  walletAddress: freelancer.walletAddress,
}

export function shortAddress(address: string, chars = 4) {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
