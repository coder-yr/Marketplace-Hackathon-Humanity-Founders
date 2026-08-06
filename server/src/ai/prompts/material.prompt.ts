/**
 * Material Analysis Prompt
 * Generates deep AI analysis of a textile material based on product + supplier data.
 */
export interface MaterialAnalysisInput {
  title: string
  fabricType: string
  composition?: string
  weight?: string
  width?: string
  certifications?: string[]
  country?: string
  moq?: string
  leadTime?: string
  priceRange?: string
  description?: string
}

export const buildMaterialAnalysisPrompt = (
  input: MaterialAnalysisInput,
): string => `
You are an expert textile engineer and B2B sourcing analyst for an enterprise procurement platform.

Analyze the following textile material and return a structured JSON object.

Material Details:
- Title: ${input.title}
- Fabric Type: ${input.fabricType}
- Composition: ${input.composition || 'Not specified'}
- Weight: ${input.weight || 'Not specified'}
- Width: ${input.width || 'Not specified'}
- Certifications: ${input.certifications?.join(', ') || 'None listed'}
- Country of Origin: ${input.country || 'Not specified'}
- MOQ: ${input.moq || 'Not specified'}
- Lead Time: ${input.leadTime || 'Not specified'}
- Price Range: ${input.priceRange || 'Not specified'}
- Description: ${input.description || ''}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact schema:
{
  "summary": "One sentence professional description of the material",
  "bestApplications": ["application1", "application2", "application3"],
  "advantages": ["advantage1", "advantage2", "advantage3"],
  "limitations": ["limitation1", "limitation2"],
  "marketDemand": "High|Medium|Low",
  "sustainability": "Brief sustainability assessment",
  "riskLevel": "LOW|MEDIUM|HIGH",
  "alternatives": ["alternative material 1", "alternative material 2"],
  "aiConfidence": 95
}
`
