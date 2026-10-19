import { Router } from 'express'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js'
import { protect, adminOnly } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(protect, adminOnly)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router