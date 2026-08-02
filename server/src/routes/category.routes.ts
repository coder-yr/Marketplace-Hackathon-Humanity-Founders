import { Router } from 'express'
import { getAllCategories } from '../controllers/category.controller'

export const categoryRouter = Router()

categoryRouter.get('/', getAllCategories)
