import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El titulo es obligatorio'],
    trim: true,
    minlength: [2, 'El titulo tiene que tener al menos 2 caracteres']
  },


  author: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true
  },


  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },


  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },

  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    validate: {
      validator: Number.isInteger,
      message: 'El stock tiene que ser un numero entero'
    }
  },

  cover: {
    type: String,
    default: ''
  },

  genre: {
    type: String,
    default: 'Terror'
  },

  publicationYear: {
    type: Number
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)
export default Book