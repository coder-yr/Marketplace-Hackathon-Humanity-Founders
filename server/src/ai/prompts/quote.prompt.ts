/**
 * Quote Intelligence Prompt
 * Analyzes a received supplier quotation for fairness, risks, and savings.
 */
export const buildQuoteAnalysisPrompt = (
  quote: any,
  productContext?: any,
): string => `
You are an expert B2B textile procurement analyst and pricing specialist.

Analyze the following supplier quotation for a textile buyer.

Quote Details:
${JSON.stringify(quote, null, 2)}

${productContext ? `Product Context:\n${JSON.stringify(productContext, null, 2)}` : ''}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact schema:
{
  "marketAverage": "$X.XX per meter (or unit)",
  "riskLevel": "LOW|MEDIUM|HIGH",
  "fairnessScore": 82,
  "estimatedSavings": "X% below market" or "X% above market",
  "recommendation": "Clear action recommendation for the buyer",
  "negotiationStrategy": "Specific negotiation tactic to get a better price"
}

Base your analysis on:
- Industry standard pricing for this fabric type and quality
- Lead time competitiveness
- MOQ reasonableness
- Supplier reputation signals
`
