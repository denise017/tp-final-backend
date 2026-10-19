import { useEffect, useState } from 'react'
import './Cart.css'

function Cart({ usuario, cartUpdate }) {
  const [items, setItems] = useState([])
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    async function getCart() {
      if (!usuario) {
        setItems([])
        setOrderSuccess(false)
        return
      }

      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      setItems(data.carrito.items)

      if (data.carrito.items.length > 0) {
        setOrderSuccess(false)
      }
    }

    getCart()
  }, [usuario, cartUpdate])

  async function handleRemove(bookId) {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3000/api/cart/items/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      setItems(items.filter(item => item.book._id !== bookId))
    }
  }

  async function handleOrder() {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      setItems([])
      setOrderSuccess(true)
    }
  }

  const total = items.reduce((suma, item) => {
    return suma + item.book.price * item.quantity
  }, 0)

  return (
    <section className="cart" id="carrito">
      <div className="cart-content">
        <p className="cart-label">MIDNIGHT BOOKS</p>
        <h2>MI CARRITO</h2>

        {!usuario && <p>Inicia sesión para ver tu carrito.</p>}

        {usuario && items.length === 0 && !orderSuccess && (
          <p>Tu carrito está vacío.</p>
        )}

        {usuario && orderSuccess && (
          <p>Pedido realizado correctamente!</p>
        )}

        {items.map(item => (
          <div className="cart-item" key={item.book._id}>
            <img src={item.book.cover} alt={item.book.title} />

            <div>
              <h3>{item.book.title}</h3>
              <p>{item.book.author}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>${item.book.price.toLocaleString('es-AR')}</p>
            </div>

            <button
              className="cart-delete"
              onClick={() => handleRemove(item.book._id)}
              aria-label="Eliminar del carrito"
            >
              <img src="/images/icons/bin.svg" alt="" />
            </button>
          </div>
        ))}

        {usuario && items.length > 0 && (
          <div className="cart-checkout">
            <h3 className="cart-total">
              Total: ${total.toLocaleString('es-AR')}
            </h3>

            <button onClick={handleOrder}>
              Confirmar pedido
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart