import { Router } from 'express'
import {
  getCart,
  getCartById,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cartController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(protect)

router.get('/', getCart)
router.get('/:id', getCartById)
router.post('/items', addToCart)
router.put('/items/:bookId', updateCartItem)
router.delete('/items/:bookId', removeFromCart)

export default router