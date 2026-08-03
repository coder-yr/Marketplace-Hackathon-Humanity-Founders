import { IProduct } from '../models/product.model'

export const buildSummaryPrompt = (product: IProduct): string => {
  return `
You are an expert textile engineer and B2B sourcing assistant.
Provide a concise, professional summary for the following product to display on its product detail page.

Product: ${product.title}
Fabric: ${product.fabricType}
Description: ${product.description}
Short Desc: ${product.shortDescription}
Tags: ${product.tags.join(', ')}

Your summary should be 3-4 bullet points highlighting:
1. Core material and construction.
2. Best commercial use cases (e.g., apparel, upholstery, technical).
3. Key advantages (e.g., durability, breathability, eco-friendliness).

Format as a simple markdown list. Do not include introductory text.
`
}
