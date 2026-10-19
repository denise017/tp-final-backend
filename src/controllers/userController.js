import User from '../models/User.js'

// obtener todos los usuarios
export async function getUsers(req, res, next) {
  try {
    const users = await User.find()

    res.status(200).json({ usuarios: users })
  } catch (error) {
    next(error)
  }
}

// obtener un usuario por id
export async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      })
    }

    res.status(200).json({ usuario: user })
  } catch (error) {
    next(error)
  }
}

// actualizar un usuario
export async function updateUser(req, res, next) {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        mensaje: 'Ingresa un nombre'
      })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      })
    }

    res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: user
    })
  } catch (error) {
    next(error)
  }
}

// eliminar un usuario
export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      })
    }

    res.status(200).json({
      mensaje: 'Usuario eliminado correctamente'
    })
  } catch (error) {
    next(error)
  }
}