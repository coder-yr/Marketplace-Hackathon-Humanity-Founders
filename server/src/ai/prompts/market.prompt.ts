/**
 * Market Insights Prompt
 * Generates real-time market intelligence for a textile material.
 */
export const buildMarketInsightsPrompt = (
  fabricType: string,
  region?: string,
): string => `
You are an expert textile market analyst with deep knowledge of global fabric markets.

Generate market intelligence for the following material:
- Fabric Type: ${fabricType}
- Region: ${region || 'Global'}
- Analysis Date: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact schema:
{
  "trend": "Rising|Stable|Declining",
  "trendPercent": "+4% this month",
  "demand": "High|Medium|Low",
  "availability": "High|Medium|Low|Scarce",
  "bestBuyWindow": "Month or season name",
  "priceOutlook": "Brief 1-sentence price outlook for next 3 months",
  "keyFactors": [
    "Key market factor 1",
    "Key market factor 2",
    "Key market factor 3"
  ],
  "regionInsights": "Brief regional supply chain insight"
}

Base your analysis on:
- Seasonal demand patterns for this fabric type
- Global supply chain dynamics
- Raw material cost trends (cotton, flax, polyester, etc.)
- Sustainability and regulation trends affecting this material
`
