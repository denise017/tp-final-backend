import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Se tiene que ingresar un nombre'],
    trim: true,
    minlength: [2, 'El nombre tiene que ser al menos 2 caratceres'],
    maxlength: [50, 'El nombre no puede superar los 50 caracteres']
  },


  email: {
    type: String,
    required: [true, 'Se debe ingresar un correo'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'El correo debe ser valido']
  },

  password: {
    type: String,
    required: [true, 'Ingresa una contraseña'],
    minlength: [6, 'La contraseña tiene que ser al menos 6 caracteres'],
    select: false
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  avatar: {
    type: String,
    default: 'cat-default'
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

   // Proteger la contraseña antes de guardar un usuario
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  this.password = await bcrypt.hash(this.password, 12)
})

    // Comprobar la contraseña durante el inicio de sesion
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

    // No poner la contraseña cuando pones los datos del usuario
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

const User = mongoose.model('User', userSchema)

export default User
