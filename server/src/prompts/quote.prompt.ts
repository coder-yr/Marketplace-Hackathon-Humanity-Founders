import { IProduct } from '../models/product.model'

export const buildQuotePrompt = (product: IProduct, buyerContext: any): string => {
  return `
You are an expert sourcing assistant drafting a Request for Quotation (RFQ) message for a B2B textile buyer.

Buyer Context:
${JSON.stringify(buyerContext, null, 2)}

Product Details:
Title: ${product.title}
Fabric Type: ${product.fabricType}
Listed MOQ: ${product.moq.value} ${product.moq.unit}
Listed Price: ${product.priceRange.min}-${product.priceRange.max} ${product.priceRange.currency}

Draft a professional, concise email/message to the supplier. The buyer is interested in sourcing this product.
Include placeholders for the buyer to fill in specific quantities if they aren't explicitly known.
Do not use a subject line, just the body of the message. Keep it polite, direct, and focused on business (sampling, pricing, lead times).
`
}
