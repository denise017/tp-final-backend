import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { protect, adminOnly } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// Consultar los datos del usuario que inicio sesion
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    mensaje: 'Perfil obtenido correctamente',
    usuario: req.user
  })
})

// Ruta para comprobar permisos de administrador
router.get('/admin', protect, adminOnly, (req, res) => {
  res.status(200).json({
    mensaje: 'Acceso de administrador autorizado'
  })
})

export default router