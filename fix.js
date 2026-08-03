const fs = require('fs')
const path = require('path')

const controllers = [
  'message.controller.ts',
  'notification.controller.ts',
  'order.controller.ts',
  'quote.controller.ts',
  'rfq.controller.ts'
]

controllers.forEach(c => {
  const file = path.join(__dirname, 'server/src/controllers', c)
  let content = fs.readFileSync(file, 'utf8')
  
  // replace req.user.id with (req.user as any)._id
  content = content.replace(/req\.user\.id/g, '(req.user as any)._id')
  
  // replace req.params.id with req.params.id as string or similar?
  // the error is Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
  content = content.replace(/req\.params\.id/g, '(req.params.id as string)')
  content = content.replace(/req\.params\.contextId/g, '(req.params.contextId as string)')
  
  fs.writeFileSync(file, content)
})

const routes = [
  'message.routes.ts',
  'notification.routes.ts',
  'order.routes.ts',
  'quote.routes.ts',
  'rfq.routes.ts'
]

routes.forEach(r => {
  const file = path.join(__dirname, 'server/src/routes', r)
  let content = fs.readFileSync(file, 'utf8')
  
  content = content.replace(/'\.\.\/middleware\/auth'/g, "'../middleware/requireAuth'")
  
  fs.writeFileSync(file, content)
})

// fix ai.controller.ts
const aiFile = path.join(__dirname, 'server/src/controllers/ai.controller.ts')
let aiContent = fs.readFileSync(aiFile, 'utf8')
aiContent = aiContent.replace(/import { ProviderRouter } from '\.\.\/providers\/router'/g, "")
aiContent = "import { ProviderRouter } from '../providers/router'\n" + aiContent
fs.writeFileSync(aiFile, aiContent)

console.log('Fixed typings')
