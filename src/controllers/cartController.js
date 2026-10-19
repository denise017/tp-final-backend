import mongoose from 'mongoose'
import Cart from '../models/Cart.js'
import Book from '../models/Book.js'

// consultar el carrito del usuario
export async function getCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.book', 'title author price cover stock')

    res.status(200).json({
      mensaje: 'Carrito obtenido correctamente',
      carrito: cart || { items: [] }
    })
  } catch (error) {
    next(error)
  }
}

// agregar un libro al carrito
export async function addToCart(req, res, next) {
  try {
    const { bookId, quantity } = req.body || {}

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        mensaje: 'Tiene que ser un numero entero mayor a cero'
      })
    }

    const book = await Book.findOne({ _id: bookId, isActive: true })

    if (!book) {
      return res.status(404).json({
        mensaje: 'El libro no existe o no esta dispoinble'
      })
    }

    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: []
      })
    }

    const item = cart.items.find(
      item => item.book.toString() === bookId
    )

    const totalQuantity = (item ? item.quantity : 0) + quantity

    if (totalQuantity > book.stock) {
      return res.status(400).json({
        mensaje: 'No hay suficiente stock disponible'
      })
    }

    if (item) {
      item.quantity = totalQuantity
    } else {
      cart.items.push({ book: bookId, quantity })
    }

    await cart.save()

    res.status(200).json({
      mensaje: 'Libro agregado al carrito',
      carrito: cart
    })
  } catch (error) {
    next(error)
  }
}

// actualizar la cantidad de un libro
export async function updateCartItem(req, res, next) {
  try {
    const { bookId } = req.params
    const { quantity } = req.body || {}

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        mensaje: 'La cantidad debe ser un numero entero mayor a cero'
      })
    }

    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({
        mensaje: 'No encontramos tu carrito'
      })
    }

    const item = cart.items.find(
      item => item.book.toString() === bookId
    )

    if (!item) {
      return res.status(404).json({
        mensaje: 'El libro no está en tu carrito'
      })
    }

    const book = await Book.findOne({ _id: bookId, isActive: true })

    if (!book) {
      return res.status(404).json({
        mensaje: 'El libro ya no esta disponible'
      })
    }

    if (quantity > book.stock) {
      return res.status(400).json({
        mensaje: 'No hay suficiente stock disponible'
      })
    }

    item.quantity = quantity
    await cart.save()

    res.status(200).json({
      mensaje: 'Cantidad actualizada correctamente',
      carrito: cart
    })
  } catch (error) {
    next(error)
  }
}

// sacar un libro del carrito
export async function removeFromCart(req, res, next) {
  try {
    const { bookId } = req.params

    if (!mongoose.isValidObjectId(bookId)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({
        mensaje: 'No encontramos tu carrito'
      })
    }


    const item = cart.items.find(
        item => item.book.toString() === bookId
    )
    if (!item) {
        return res.status(404).json({
    mensaje: 'El libro no está en tu carrito'
})
}

cart.items.pull(item._id)

    await cart.save()

    res.status(200).json({
      mensaje: 'Libro eliminado del carrito',
      carrito: cart
    })
  } catch (error) {
    next(error)
  }
}
// Consultar un carrito por ID
export async function getCartById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    const cart = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('items.book', 'title author price cover stock')

    if (!cart) {
      return res.status(404).json({
        mensaje: 'Carrito no encontrado'
      })
    }

    res.status(200).json({
      mensaje: 'Carrito encontrado',
      carrito: cart
    })
  } catch (error) {
    next(error)
  }
}