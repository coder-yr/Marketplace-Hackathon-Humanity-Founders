/**
 * Negotiation Assistant Prompt
 * Generates professional negotiation materials for buyer-supplier interactions.
 */
export const buildNegotiationPrompt = (
  quote: any,
  supplier: any,
  buyerPreferences?: any,
): string => `
You are an expert B2B textile procurement negotiation specialist.

Generate professional negotiation materials for the following scenario:

Quote Received:
${JSON.stringify(quote, null, 2)}

Supplier Information:
${JSON.stringify(supplier, null, 2)}

${buyerPreferences ? `Buyer Preferences:\n${JSON.stringify(buyerPreferences, null, 2)}` : ''}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact schema:
{
  "counterOffer": "Specific counter-proposal text (e.g., $X.XX per meter with 500m MOQ)",
  "suggestedPrice": "$X.XX",
  "professionalEmail": "Full professional negotiation email ready to send",
  "negotiationTips": [
    "Specific tip 1 for this negotiation",
    "Specific tip 2",
    "Specific tip 3"
  ],
  "confidenceScore": 85
}

The professional email must:
- Be formal and respectful
- Reference the specific quote details
- Make a concrete counter-proposal
- Be ready to send without editing
- Be 150-250 words
`
