# AI Integration — B2B Textile Marketplace

*Last updated: Phase 0 — Foundation*

---

## Overview

AI is used to enhance product discovery and matching between buyers and suppliers.

**Provider:** Hugging Face Inference API  
**Primary Model:** `sentence-transformers/all-MiniLM-L6-v2`  
**Use Cases:** Semantic product search, buyer-supplier matching, tag extraction

---

## Architecture

```
Client Search Query
       │
       ▼
  Server AI Layer (server/src/ai/)
       │
       ├── Embed query → vector (Hugging Face)
       │
       ├── Compare against product embeddings (MongoDB)
       │
       └── Return ranked results
```

---

## Models Used

| Model | Use Case | Endpoint |
|-------|----------|----------|
| `sentence-transformers/all-MiniLM-L6-v2` | Semantic search embeddings | `feature-extraction` |

---

## Planned Features

| Feature | Phase | Description |
|---------|-------|-------------|
| Semantic product search | Phase 4 | Natural language queries find relevant products |
| Product tag extraction | Phase 4 | Auto-tag new products from description |
| Buyer recommendations | Phase 4 | Suggest products based on browsing history |
| Supplier matching | Phase 5 | Match buyer RFQs to best-fit suppliers |

---

## Integration Points

### Backend (`server/src/ai/`)
- `embedding.service.ts` — calls Hugging Face API, returns float vectors
- `search.service.ts` — cosine similarity ranking

### Environment Variables
```
HUGGINGFACE_API_KEY=hf_...
```

---

## Embedding Strategy

- Product embeddings are generated on product creation/update.
- Embeddings are stored in MongoDB alongside each product.
- At search time: embed query, run cosine similarity against all product embeddings.
- Future: move to vector DB (Pinecone, Weaviate) if scale demands.

---

## Cosine Similarity

```ts
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}
```

---

*Update this file whenever AI integration changes.*
