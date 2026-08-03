const fs = require('fs')
const path = require('path')

const files = [
  'server/src/controllers/message.controller.ts',
  'server/src/controllers/notification.controller.ts'
]

files.forEach(f => {
  const file = path.join(__dirname, f)
  let content = fs.readFileSync(file, 'utf8')
  
  // Replace missing string casts
  content = content.replace(/req\.params\.contextId(?! as)/g, 'req.params.contextId as string')
  content = content.replace(/req\.params\.id(?! as)/g, 'req.params.id as string')
  
  fs.writeFileSync(file, content)
})

const aiFile = path.join(__dirname, 'server/src/controllers/ai.controller.ts')
let aiContent = fs.readFileSync(aiFile, 'utf8')
aiContent = aiContent.replace(/export const supplierRecommendations = async \(req: Request/g, 'export const supplierRecommendations = async (_req: Request')
aiContent = aiContent.replace(/export const draftRfq = async \(req: Request/g, 'export const draftRfq = async (_req: Request')
fs.writeFileSync(aiFile, aiContent)

console.log('Fixed remaining errors')
