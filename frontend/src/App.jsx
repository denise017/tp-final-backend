import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import BookCatalog from './components/BookCatalog/BookCatalog'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [cartUpdate, setCartUpdate] = useState(0)
  const [usuario, setUsuario] = useState(() => {
    const savedUser = localStorage.getItem('usuario')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    async function getBooks() {
      const response = await fetch('/api/books')
      const data = await response.json()
      setBooks(data.libros)
    }

    getBooks()
  }, [])

  function handleLogin(user) {
    setUsuario(user)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  async function handleAddToCart(book) {
    const token = localStorage.getItem('token')

    if (!token) return

    const response = await fetch('/api/cart/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: book._id,
        quantity: 1
      })
    })

    if (response.ok) {
      setCartUpdate(cartUpdate + 1)
    }
  }

  return (
    <>
      <Navbar usuario={usuario} onLogout={handleLogout}/>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <p className="hero-label">NOVEDAD 2026</p>
            <h1>OTROS MUNDOS</h1>
            <h2>Stephen King y Peter Straub</h2>
            <a href="#catalogo" className="hero-button">
              Ver catalogo →
            </a>
          </div>
        </section>

        <BookCatalog books={books} onAddToCart={handleAddToCart} />

        <Cart usuario={usuario} cartUpdate={cartUpdate} />

        {usuario ? (
          <section className="register" id="login">
            <div className="register-box welcome-box">
              <h2>Bienvenido, {usuario.name}</h2>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </section>
        ) : (
          <>
            <Register />
            <Login onLogin={handleLogin} />
          </>
        )}
      </main>
    </>
  )
}

export default App