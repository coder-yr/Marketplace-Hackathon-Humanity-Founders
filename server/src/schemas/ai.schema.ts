import { z } from 'zod'

// Accepts ANYTHING from the AI and coerces to number
const coerceNum = z.any().transform((v) => {
  if (v == null) return 0
  if (typeof v === 'number') return v
  if (typeof v === 'object') {
    // e.g. { value: 12.5 } or { score: 85 }
    const n = v.value ?? v.score ?? v.amount ?? v.number ?? Object.values(v)[0]
    return parseFloat(String(n)) || 0
  }
  return parseFloat(String(v)) || 0
})

// Accepts ANYTHING from the AI and coerces to string
const coerceStr = z.any().transform((v) => {
  if (v == null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (typeof v === 'object') {
    // e.g. { level: "High" } or { value: "95%", label: "Excellent" }
    const s = v.value ?? v.label ?? v.text ?? v.level ?? v.name ?? v.status
    if (s != null) return String(s)
    return JSON.stringify(v)
  }
  return String(v)
})

// Like coerceStr but also handles numeric objects nicely for display
const flexStr = coerceStr

export const ProductIntelligenceSchema = z.object({
  material: z.object({
    score: coerceNum,
    summary: coerceStr,
    bestApplications: z.array(coerceStr).default([]),
    advantages: z.array(coerceStr).default([]),
    limitations: z.array(coerceStr).default([])
  }),
  supplier: z.object({
    trustScore: coerceNum,
    responseRate: flexStr,   // AI often returns a number like 95 (not "95%")
    reliability: coerceStr
  }),
  comparison: z.object({
    winner: coerceStr,
    estimatedSavings: flexStr,
    // Use z.any() for the comparison array — the AI uses wildly different key names
    // We normalise them in the transform
    comparison: z.array(z.any()).default([]).transform((items) =>
      items.map((item: any) => ({
        supplier: coerceStr.parse(item?.supplier ?? item?.name ?? item?.supplierName ?? item?.company ?? ''),
        price: coerceStr.parse(item?.price ?? item?.unitPrice ?? item?.pricePerUnit ?? ''),
        leadTime: coerceStr.parse(item?.leadTime ?? item?.lead_time ?? item?.deliveryTime ?? ''),
        trustScore: coerceNum.parse(item?.trustScore ?? item?.trust ?? item?.rating ?? 0),
        capacity: coerceStr.parse(item?.capacity ?? item?.moq ?? item?.minOrder ?? ''),
        pros: Array.isArray(item?.pros) ? item.pros.map(String) : [],
        cons: Array.isArray(item?.cons) ? item.cons.map(String) : [],
      }))
    )
  }),
  market: z.object({
    marketValue: coerceNum,   // AI sometimes returns a string like "Moderate"
    priceTrend: coerceStr,
    demand: coerceStr
  }),
  procurement: z.object({
    risk: z.enum(['LOW', 'MEDIUM', 'HIGH']).catch('MEDIUM'),
    confidence: coerceNum
  })
})

export const RfqIntelligenceSchema = z.object({
  costAnalysis: z.object({
    marketAverage: coerceNum,
    lowestExpected: coerceNum,
    highestExpected: coerceNum
  }),
  risk: z.object({
    level: z.enum(['LOW', 'MEDIUM', 'HIGH']).catch('MEDIUM'),
    reasons: z.array(coerceStr).default([])
  }),
  recommendedBudget: coerceNum,
  negotiationStrategy: z.object({
    reasons: z.array(coerceStr).default([])
  }),
  recommendedSuppliers: z.array(coerceStr).default([]),
  expectedDelivery: coerceStr,
  budgetScore: coerceNum
})

export const MaterialReviewSchema = z.object({
  qualityScore: coerceNum,
  missingFields: z.array(coerceStr).default([]),
  improvedTitle: coerceStr,
  improvedDescription: coerceStr,
  seoKeywords: z.array(coerceStr).default([]),
  recommendedCertifications: z.array(coerceStr).default([]),
  warnings: z.array(coerceStr).default([]),
  publishReadiness: z.enum(['READY', 'NEEDS_IMPROVEMENT', 'REJECTED']).catch('NEEDS_IMPROVEMENT')
})

export const CopilotIntentSchema = z.object({
  intent: z.enum(['Supplier Search', 'RFQ Generator', 'Supplier Compare', 'Quote Analysis', 'Knowledge', 'Negotiation', 'General']).catch('General'),
  extractedEntities: z.record(z.string(), z.any()).default({})
})
