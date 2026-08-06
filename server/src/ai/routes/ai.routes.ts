import { Router } from 'express'
import * as aiController from '../controllers/ai.controller'

const router = Router()

/**
 * Enterprise AI Intelligence Layer — Phase 8
 * All endpoints mounted at /api/ai/
 */

// POST /api/ai/material-analysis
router.post('/material-analysis', aiController.materialAnalysis)

// POST /api/ai/rfq-generator
router.post('/rfq-generator', aiController.rfqGenerator)

// POST /api/ai/supplier-comparison
router.post('/supplier-comparison', aiController.supplierComparison)

// POST /api/ai/quote-analysis
router.post('/quote-analysis', aiController.quoteAnalysis)

// POST /api/ai/market-insights
router.post('/market-insights', aiController.marketInsights)

// POST /api/ai/negotiation
router.post('/negotiation', aiController.negotiation)

// POST /api/ai/copilot
router.post('/copilot', aiController.copilot)

export default router
