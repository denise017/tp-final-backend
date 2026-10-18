import { Router } from 'express'
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js'
import { protect, adminOnly } from '../middlewares/authMiddleware.js'

const router = Router()

// Cualquier visitante puede ver el catalogo
router.get('/', getBooks)
router.get('/:id', getBookById)

// Solo los administradores pueden modificar el catalogo
router.post('/', protect, adminOnly, createBook)
router.put('/:id', protect, adminOnly, updateBook)
router.delete('/:id', protect, adminOnly, deleteBook)

export default router