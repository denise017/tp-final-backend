import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function createToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )
}

// Registrar un usuario
export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        mensaje: 'Ingresa un nombre, correo y contraseña validos'
      })
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase()
    })

    if (existingUser) {
      return res.status(409).json({
        mensaje: 'Ya existe una cuenta con ese correo'
      })
    }

    const user = await User.create({
      name,
      email,
      password
    })

    const token = createToken(user._id)

    return res.status(201).json({
      mensaje: 'Cuenta creada correctamente',
      usuario: user,
      token
    })
  } catch (error) {
    next(error)
  }
}

// Iniciar sesion
export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body

    if (typeof email !== 'string' || typeof password !== 'string' ||
        !email.trim() || !password) {
      return res.status(400).json({
        mensaje: 'Ingresa tu correo y contraseña'
      })
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      })
    }

    const token = createToken(user._id)

    return res.status(200).json({
      mensaje: 'Inicio de sesion exitoso',
      usuario: user,
      token
    })
  } catch (error) {
    next(error)
  }
}