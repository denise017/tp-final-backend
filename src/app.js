import path from 'path'
import { fileURLToPath } from 'url'


import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(cors())

app.use(express.json())

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    mensaje: 'Demasiadas solicitudes. Intente nuevamente en 15 minutos.'
  }
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    mensaje: 'Demasiados intentos. Intente nuevamente en 15 minutos.'
  }
})

app.use('/api', globalLimiter)
app.use('/api/auth', authLimiter)

app.get('/api', (req, res) => {
  res.json({
    nombre: 'Midnight Books',
    descripcion: 'API REST de una libreria online de terror',
    version: '1.0.0',
    endpoints: {
      autenticacion: '/api/auth',
      usuarios: '/api/users',
      libros: '/api/books',
      carrito: '/api/cart',
      pedidos: '/api/orders'
    }
  })
})


app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api', (req, res) => {
  res.status(404).json({ mensaje: 'La ruta solicitada no existe' })
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const frontendPath = path.join(__dirname, '../frontend/dist')

app.use(express.static(frontendPath))

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

app.use((error, req, res, next) => {
  if (error.status === 400 && error.type === 'entity.parse.failed') {
    return res.status(400).json({
      mensaje: 'El JSON enviado no es valido'
    })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      mensaje: 'Hay datos incorrectos',
      errores: Object.values(error.errors).map(err => err.message)
    })
  }
  if (error.code === 11000) {
    return res.status(409).json({
      mensaje: 'El correo ya esta en uso'
    })
  }

  res.status(500).json({
    mensaje: 'Error interno del servidor'
  })
})
export default app