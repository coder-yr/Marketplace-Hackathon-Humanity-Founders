export const ProductIntelligenceBuilderV1 = {
  version: 'product.v1',
  buildPrompt: (product: any, supplier: any) => {
    const safeStringify = (obj: any, limit = 15000) => {
      const str = JSON.stringify(obj, null, 2) || '';
      return str.length > limit ? str.substring(0, limit) + '\n... [TRUNCATED]' : str;
    };

    const systemPrompt = `You are an expert AI Procurement Analyst.
You are given a product specification and its supplier profile.
You must return a strict JSON object mapping exactly to the ProductIntelligenceSchema.
Do not wrap your output in markdown blocks. Return raw JSON.`

    const userPrompt = `Product Specifications:
${safeStringify(product)}

Supplier Profile:
${safeStringify(supplier)}

Analyze this product for an enterprise buyer. Provide:
1. material (score out of 100, summary, bestApplications, advantages, limitations)
2. supplier (trustScore out of 100, responseRate, reliability)
3. comparison (winner: "Current Supplier" or "Alternative", estimatedSavings as a realistic numeric string like "1500" or "420", comparison array of alternatives)
4. market (marketValue as a score out of 100 representing market attractiveness, priceTrend, demand)
5. procurement (risk: "LOW"|"MEDIUM"|"HIGH", confidence: 0-100)

CRITICAL: Never return 0 or "0" for scores or savings. Always estimate a realistic number based on the product.
`

    return { systemPrompt, userPrompt, prompt: systemPrompt + '\n\n' + userPrompt }
  }
}
