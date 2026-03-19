import { Router } from 'express'
import { getDomains, getDomainById } from '../controllers/domain.controller.js'

const router = Router()

// GET /api/domains          — list all domains (optionally ?id=frontend)
router.get('/', getDomains)

// GET /api/domains/:id      — get single domain by slug
router.get('/:id', getDomainById)

export default router
