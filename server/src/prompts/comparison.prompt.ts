import { IProduct } from '../models/product.model'

export const buildComparisonPrompt = (products: IProduct[]): string => {
  const productsData = products.map((p, index) => ({
    id: index + 1,
    title: p.title,
    fabricType: p.fabricType,
    price: `${p.priceRange.min} - ${p.priceRange.max} ${p.priceRange.currency}/${p.priceRange.unit}`,
    moq: `${p.moq.value} ${p.moq.unit}`,
    leadTime: p.leadTime,
    certifications: p.certifications.join(', '),
    specifications: p.specifications
  }))

  return `
You are an expert textile sourcing agent assisting a buyer.
Compare the following B2B textile products.

Products:
${JSON.stringify(productsData, null, 2)}

Provide a concise, professional comparison. Structure your response with:
1. **Differences**: The main technical and commercial differences between them.
2. **Advantages**: Highlight what makes each product unique or better suited for certain applications.
3. **Best Use Case**: A quick recommendation on when to choose which product.

Keep the formatting clean using markdown. Use bullet points for readability. Do not hallucinate information outside of the provided JSON.
`
}
