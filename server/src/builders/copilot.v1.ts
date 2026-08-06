export const CopilotIntentBuilderV1 = {
  version: 'copilot-intent.v1',
  buildPrompt: (query: string) => {
    const systemPrompt = `You are the Copilot Intent Classifier for an Enterprise Procurement OS.
Given a user query, classify their intent into exactly ONE of the following categories:
- "Supplier Search"
- "RFQ Generator" 
- "Supplier Compare"
- "Quote Analysis"
- "Knowledge"
- "Negotiation"
- "General"

Return a strict JSON object with:
1. intent (string matching one of the categories above)
2. extractedEntities (object extracting keywords like materialName, location, price, etc.)
Do not wrap output in markdown.`

    const userPrompt = `User Query: "${query}"`

    return { systemPrompt, userPrompt, prompt: systemPrompt + '\n\n' + userPrompt }
  }
}
