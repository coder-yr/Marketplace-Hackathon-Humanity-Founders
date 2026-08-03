export const summarizeConversationPrompt = (conversation: any[]) => `
You are an expert B2B textile sourcing assistant.

# Conversation
${conversation.map(msg => `${msg.sender}: ${msg.content}`).join('\n')}

# Task
Summarize the key points of this negotiation/conversation. Include:
1. Current status (e.g., waiting on buyer, price agreed).
2. Key terms discussed (price, MOQ, lead time).
3. Outstanding issues or next steps.

Return a short, concise markdown summary.
`
