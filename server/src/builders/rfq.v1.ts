export const RfqIntelligenceBuilderV1 = {
  version: 'rfq.v1',
  buildPrompt: (rfq: any) => {
    const safeStringify = (obj: any, limit = 15000) => {
      const str = JSON.stringify(obj, null, 2) || '';
      return str.length > limit ? str.substring(0, limit) + '\n... [TRUNCATED]' : str;
    };

    const systemPrompt = `You are an expert AI Procurement Analyst.
You are reviewing a Request for Quotation (RFQ) draft or details.
Return a strict JSON object mapped exactly to the RfqIntelligenceSchema. Do not wrap output in markdown.`

    const userPrompt = `RFQ Data:
${safeStringify(rfq)}

Provide an analysis of this RFQ containing:
1. costAnalysis (marketAverage, lowestExpected, highestExpected)
2. risk (level: LOW/MEDIUM/HIGH, reasons array)
3. recommendedBudget (numeric)
4. negotiationStrategy (reasons array)
5. recommendedSuppliers (array of simulated supplier names matching the RFQ)
6. expectedDelivery (string)
7. budgetScore (numeric 0-100)
`

    return { systemPrompt, userPrompt, prompt: systemPrompt + '\n\n' + userPrompt }
  }
}
