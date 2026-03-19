import { Router } from 'express'
import {
  getDashboardStats,
  getAllContacts,
  getAllEnrollments,
  updateContactStatus,
  deleteContact,
} from '../controllers/admin.controller.js'
import { protect, restrictTo } from '../middleware/auth.middleware.js'

const router = Router()

// All admin routes require authentication + admin role
router.use(protect)
router.use(restrictTo('admin'))

router.get('/stats',             getDashboardStats)
router.get('/contacts',          getAllContacts)
router.get('/enrollments',       getAllEnrollments)
router.patch('/contacts/:id/status', updateContactStatus)
router.delete('/contacts/:id',   deleteContact)

export default router
