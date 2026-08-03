export const suggestQuotePrompt = (rfq: any, productContext: any, history: any[]) => `
You are an expert B2B textile sourcing AI acting as a pricing and quotation assistant for a supplier.

# RFQ Details
Quantity Requested: ${rfq.quantity}
Target Price: ${rfq.targetPrice || 'N/A'}
Notes: ${rfq.notes || 'None'}

# Product Context
Product: ${productContext.title}
Base Price: ${productContext.price}
MOQ: ${productContext.moq}

# Relevant History (Similar past quotes)
${history.map(h => `- Qty: ${h.quantity}, Offered Price: ${h.offeredPrice}, Status: ${h.status}`).join('\n')}

# Task
Suggest an optimal quote response.
Return a JSON object with this exact structure:
{
  "suggestedPrice": number,
  "suggestedLeadTime": "string",
  "reasoning": "string (Why this price and lead time make sense for this deal)"
}

Do not return any markdown code block markers. Only return the raw JSON object.
`
