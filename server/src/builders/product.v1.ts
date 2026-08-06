export const ProductIntelligenceBuilderV1 = {
  version: 'product.v1',
  buildPrompt: (product: any, supplier: any) => {
    const systemPrompt = `You are an expert AI Procurement Analyst.
You are given a product specification and its supplier profile.
You must return a strict JSON object mapping exactly to the ProductIntelligenceSchema.
Do not wrap your output in markdown blocks. Return raw JSON.`

    const userPrompt = `Product Specifications:
${JSON.stringify(product, null, 2)}

Supplier Profile:
${JSON.stringify(supplier, null, 2)}

Analyze this product for an enterprise buyer. Provide:
1. material (score out of 100, summary, bestApplications, advantages, limitations)
2. supplier (trustScore, responseRate, reliability)
3. comparison (winner: "Current Supplier" or "Alternative", estimatedSavings, comparison array of alternatives)
4. market (marketValue, priceTrend, demand)
5. procurement (risk: "LOW"|"MEDIUM"|"HIGH", confidence: 0-100)
`

    return { systemPrompt, userPrompt, prompt: systemPrompt + '\n\n' + userPrompt }
  }
}
