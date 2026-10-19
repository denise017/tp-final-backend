import { Router } from 'express'

import {

  createOrder,
  getMyOrders,
  getOrderById,
  updateOrder,
  deleteOrder

} from '../controllers/orderController.js'
import { protect, adminOnly } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(protect)

router.post('/', createOrder)
router.get('/', getMyOrders)
router.get('/:id', getOrderById)
router.put('/:id', adminOnly, updateOrder)
router.delete('/:id', adminOnly, deleteOrder)

export default router