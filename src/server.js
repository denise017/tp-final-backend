import 'dotenv/config'
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 3000

async function startServer() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
  })
}

startServer()