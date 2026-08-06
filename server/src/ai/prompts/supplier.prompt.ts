/**
 * Supplier Comparison Prompt
 * Compares multiple supplier profiles and ranks them for a buyer's needs.
 */
export const buildSupplierComparisonPrompt = (
  suppliers: any[],
  requirement?: string,
): string => `
You are an expert B2B textile procurement analyst.

Compare the following supplier profiles and provide a ranked analysis.
${requirement ? `Buyer's Requirement: "${requirement}"` : ''}

Suppliers:
${JSON.stringify(suppliers, null, 2)}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact schema:
{
  "winner": "Name of the best supplier",
  "scores": {
    "SupplierName1": {
      "price": 85,
      "quality": 92,
      "leadTime": 78,
      "capacity": 90,
      "trust": 95
    }
  },
  "strengths": ["key strength 1", "key strength 2", "key strength 3"],
  "weaknesses": ["key weakness 1", "key weakness 2"],
  "recommendation": "One clear recommendation paragraph for the buyer"
}

Score each dimension from 0-100. Be objective and data-driven.
`

/**
 * Supplier Intelligence Prompt
 * Deep analysis of a single supplier profile.
 */
export const buildSupplierIntelligencePrompt = (supplier: any): string => `
You are an expert B2B textile procurement analyst.

Provide deep intelligence analysis for this supplier profile:
${JSON.stringify(supplier, null, 2)}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact schema:
{
  "trustSummary": "2-sentence trust assessment",
  "manufacturingStrengths": ["strength1", "strength2", "strength3"],
  "exportMarkets": ["market1", "market2"],
  "certificationsSummary": "Brief certification assessment",
  "potentialRisks": ["risk1", "risk2"],
  "recommendedBuyerTypes": ["buyer type 1", "buyer type 2"],
  "overallScore": 87
}
`
