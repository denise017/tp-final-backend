import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  items: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser mayor a cero'],
      validate: {
        validator: Number.isInteger,
        message: 'La cantidad debe ser un número entero'
      }
    }
  }]
}, {
  timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)
export default Cart