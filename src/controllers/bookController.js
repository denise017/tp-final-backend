import mongoose from 'mongoose'
import Book from '../models/Book.js'

// Obtener todos los libros disponibles
export async function getBooks(req, res, next) {
  try {
    
    const books = await Book.find({ isActive: true })

    res.status(200).json({
      mensaje: 'Libros obtenidos correctamente',
      libros: books
    })
  } catch (error) {
    next(error)
  }
}

// Obtener un libro por su ID
export async function getBookById(req, res, next) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    const book = await Book.findOne({ _id: id, isActive: true })

    if (!book) {
      return res.status(404).json({
        mensaje: 'Libro no encontrado'
      })
    }

    res.status(200).json({
      mensaje: 'Libro encontrado',
      libro: book
    })
  } catch (error) {
    next(error)
  }
}

// Agregar un libro
export async function createBook(req, res, next) {
  try {

    const {
      title,
      author,
      description,
      price,
      stock,
      cover,
      genre,
      publicationYear
    } = req.body

    const book = await Book.create({
      title,
      author,
      description,
      price,
      stock,
      cover,
      genre,
      publicationYear
    })

    res.status(201).json({
      mensaje: 'Libro agregado correctamente',
      libro: book
    })
  } catch (error) {
    next(error)
  }
}

// Modificar un libro
export async function updateBook(req, res, next) {
  try {
    const { id } = req.params

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            mensaje: 'No enviaste nada para modificar'
        })
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    const allowedFields = [
      'title',
      'author',
      'description',
      'price',
      'stock',
      'cover',
      'genre',
      'publicationYear',
      'isActive'
    ]

    const book = await Book.findById(id)

    if (!book) {
      return res.status(404).json({
        mensaje: 'Libro no encontrado'
      })
    }

    for (const field of allowedFields) {
      if (Object.hasOwn(req.body, field)) {
        book[field] = req.body[field]
      }
    }

    await book.save()

    res.status(200).json({
      mensaje: 'Libro actualizado correctamente',
      libro: book
    })
  } catch (error) {
    next(error)
  }
}

// Desactivar un libro sin borrarlo de MongoDB
export async function deleteBook(req, res, next) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: 'ID incorrecto'
      })
    }

    const book = await Book.findById(id)

    if (!book || !book.isActive) {
      return res.status(404).json({
        mensaje: 'Libro no encontrado'
      })
    }

    book.isActive = false
    await book.save()

    res.status(200).json({
      mensaje: 'Libro eliminado del caalogo correctamente'
    })
  } catch (error) {
    next(error)
  }
}