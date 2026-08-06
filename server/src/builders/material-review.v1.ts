export const MaterialReviewBuilderV1 = {
  version: 'material-review.v1',
  buildPrompt: (draft: any) => {
    const systemPrompt = `You are an AI Catalog Manager reviewing a new product listing.
Return a strict JSON object mapping exactly to the MaterialReviewSchema. Do not wrap output in markdown.`

    const userPrompt = `Draft Product Data:
${JSON.stringify(draft, null, 2)}

Provide a quality review for this listing containing:
1. qualityScore (numeric 0-100)
2. missingFields (array of strings)
3. improvedTitle (string)
4. improvedDescription (string)
5. seoKeywords (array of strings)
6. recommendedCertifications (array of strings)
7. warnings (array of strings)
8. publishReadiness ("READY" | "NEEDS_IMPROVEMENT" | "REJECTED")
`

    return { systemPrompt, userPrompt, prompt: systemPrompt + '\n\n' + userPrompt }
  }
}
