import Cart from '../models/Cart.js'
import Book from '../models/Book.js'
import Order from '../models/Order.js'
import mongoose from 'mongoose'


// Crear un pedido con los libros del carrito
export async function createOrder(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        mensaje: 'El carrito está vacio'
      })
    }

    const items = []
    let total = 0

    for (const item of cart.items) {
      const book = await Book.findOne({
        _id: item.book,
        isActive: true
      })

      if (!book) {
        return res.status(404).json({
          mensaje: 'Uno de los libros no esta disponible'
        })
      }

      if (item.quantity > book.stock) {
        return res.status(400).json({
          mensaje: `No hay suficiente stock`
        })
      }

      items.push({
        book: book._id,
        title: book.title,
        quantity: item.quantity,
        price: book.price
      })

      total += book.price * item.quantity
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total
    })

    // Actualizar el stock luego de crear el pedido
    for (const item of cart.items) {
      await Book.findByIdAndUpdate(item.book, {
        $inc: { stock: -item.quantity }
      })
    }

    cart.items = []
    await cart.save()

    res.status(201).json({
      mensaje: 'Pedido creado correctamente!',
      pedido: order
    })
  } catch (error) {
    next(error)
  }
}

// Consultar los pedidos del usuario
export async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({
      user: req.user._id
    }).sort({ createdAt: -1 })

    res.status(200).json({
      mensaje: 'Pedidos obtenidos correctamente',
      pedidos: orders
    })
  } catch (error) {
    next(error)
  }
}

// Consultar un pedido por ID

export async function getOrderById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: 'ID incorrecta'
      })
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    })

    if (!order) {
      return res.status(404).json({
        mensaje: 'No encontramos el pedido solicitado'
      })
    }

    res.status(200).json({
      mensaje: 'Pedido encontrado',
      pedido: order
    })
  } catch (error) {
    next(error)
  }
}