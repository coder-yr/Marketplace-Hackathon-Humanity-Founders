import { IProduct } from '../models/product.model'

export const buildRecommendationPrompt = (products: IProduct[], buyerPreferences: any): string => {
  const productsData = products.map((p) => ({
    id: p._id,
    title: p.title,
    fabricType: p.fabricType,
    price: `${p.priceRange.min} - ${p.priceRange.max}`,
    moq: p.moq.value,
    leadTime: p.leadTime,
    certifications: p.certifications
  }))

  return `
You are an expert B2B textile sourcing AI.
You have been provided with a list of the Top 10 products from our database that loosely match the buyer's criteria.

Buyer Preferences:
${JSON.stringify(buyerPreferences, null, 2)}

Available Products:
${JSON.stringify(productsData, null, 2)}

Your task is to select the Top 3 to 5 products that best match the buyer's preferences.

Return ONLY a valid JSON array of objects. Each object must have:
- "productId": string (the exact id from the provided list)
- "confidence": string ("High", "Medium", "Low")
- "reason": string (A concise 1-2 sentence explanation of why this product is recommended for them)

Example:
[
  {
    "productId": "60d5ecb8b392d7001f3e3a12",
    "confidence": "High",
    "reason": "Matches your preferred organic cotton requirement and falls well within your target MOQ."
  }
]
`
}
