const fs = require('fs')
const path = require('path')

const clientDir = path.join(__dirname, 'client/src')

const replacements = [
  {
    file: 'features/dashboard/routes/DashboardRouter.tsx',
    find: /Bell, /g,
    replace: ''
  },
  {
    file: 'features/messages/api/messages.api.ts',
    find: /@\/shared\/api\/axios/g,
    replace: '@/lib/axios'
  },
  {
    file: 'features/notifications/api/notifications.api.ts',
    find: /@\/shared\/api\/axios/g,
    replace: '@/lib/axios'
  },
  {
    file: 'features/transactions/api/transactions.api.ts',
    find: /@\/shared\/api\/axios/g,
    replace: '@/lib/axios'
  },
  {
    file: 'features/messages/components/MessageThread.tsx',
    find: /msg =>/g,
    replace: 'msg: any =>'
  },
  {
    file: 'features/transactions/pages/BuyerQuoteCenter.tsx',
    find: /CheckCircle2, XCircle, /g,
    replace: ''
  }
]

replacements.forEach(({ file, find, replace }) => {
  const p = path.join(clientDir, file)
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8')
    content = content.replace(find, replace)
    fs.writeFileSync(p, content)
  }
})

// Fix icons imports in MessageThread.tsx
const msgThreadPath = path.join(clientDir, 'features/messages/components/MessageThread.tsx')
if (fs.existsSync(msgThreadPath)) {
  let content = fs.readFileSync(msgThreadPath, 'utf8')
  content = content.replace(/import { Send, FileText, CheckCircle2 } from 'lucide-react'/, "import { Send, FileText, CheckCircle2, MessageSquare } from 'lucide-react'")
  fs.writeFileSync(msgThreadPath, content)
}

// Fix Package import in OrderManagement.tsx
const orderPath = path.join(clientDir, 'features/transactions/pages/OrderManagement.tsx')
if (fs.existsSync(orderPath)) {
  let content = fs.readFileSync(orderPath, 'utf8')
  content = content.replace(/import { Clock, Truck, CheckCircle2, ChevronRight, XCircle } from 'lucide-react'/, "import { Clock, Truck, CheckCircle2, ChevronRight, XCircle, Package } from 'lucide-react'")
  fs.writeFileSync(orderPath, content)
}

// Fix CheckCircle2 import in SupplierRfqManagement.tsx
const supplierPath = path.join(clientDir, 'features/transactions/pages/SupplierRfqManagement.tsx')
if (fs.existsSync(supplierPath)) {
  let content = fs.readFileSync(supplierPath, 'utf8')
  content = content.replace(/import { Clock, ChevronRight, MessageSquare, Plus, FileText, Settings } from 'lucide-react'/, "import { Clock, ChevronRight, MessageSquare, Plus, FileText, Settings, CheckCircle2 } from 'lucide-react'")
  fs.writeFileSync(supplierPath, content)
}

console.log('Fixed client compilation errors')
