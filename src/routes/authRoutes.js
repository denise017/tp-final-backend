import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    mensaje: 'Perfil obtenido correctamente',
    usuario: req.user
  })
})
export default router