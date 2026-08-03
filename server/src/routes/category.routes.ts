import { Router } from 'express'
import { getAllCategories, getCategoryBySlug } from '../controllers/category.controller'

export const categoryRouter = Router()

categoryRouter.get('/', getAllCategories)
categoryRouter.get('/:slug', getCategoryBySlug)
