import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function protect(req, res, next) {
  try {
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        mensaje: 'Se debe iniciar sesion'
      })
    }

    const token = authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if (!user || !user.isActive) {
      return res.status(401).json({
        mensaje: 'Usuario no autorizado'
      })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        mensaje: 'Tu sesion expiro'
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        mensaje: 'Token incorrecto'
      })
    }

    next(error)
  }
}

// Permitir acciones solamente a administradores
export function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      mensaje: 'No tenes permisos de administrador'
    })
  }

  next()
}