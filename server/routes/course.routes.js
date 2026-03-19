import { Router } from 'express'
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js'

const router = Router()

// GET  /api/courses        — list all published courses
router.get('/', getCourses)

// GET  /api/courses/:id    — get single course
router.get('/:id', getCourseById)

// POST /api/courses        — create course (add admin auth in production)
router.post('/', createCourse)

// PUT  /api/courses/:id    — update course
router.put('/:id', updateCourse)

// DELETE /api/courses/:id  — soft delete course
router.delete('/:id', deleteCourse)

export default router
