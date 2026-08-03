export const buildSearchIntentPrompt = (query: string): string => `
You are an expert B2B textile sourcing AI.
Extract the structured search intent from the buyer's query.

Return ONLY a JSON object with the following optional keys:
- "searchTerm": string (the core fabric or keyword)
- "category": string (the category slug, e.g., 'cotton', 'silk', 'polyester', 'wool', 'linen', 'denim')
- "fabricType": string (the specific type of fabric if mentioned, e.g., 'poplin', 'jersey')
- "maxPrice": number (the maximum price per unit they are willing to pay)
- "maxMoq": number (the maximum minimum order quantity they can accept)
- "stockStatus": string ('in_stock' or 'made_to_order')

If a value is not mentioned in the query, omit the key entirely.

Query: "${query}"

Example output:
{
  "searchTerm": "organic",
  "category": "cotton",
  "maxPrice": 200,
  "maxMoq": 500
}
`
