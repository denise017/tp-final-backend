import { useState } from 'react'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const data = await response.json()
    setMessage(data.mensaje)

    if (response.ok) {
      setName('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <section className="register" id="registro">
      <div className="register-box">
        <p className="register-label">MIDNIGHT BOOKS</p>
        <h2>CREAR CUENTA</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="register-name">Nombre</label>
          <input
            id="register-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="register-email">Correo electrónico</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="register-password">Contraseña</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Registrarse</button>
        </form>

        {message && <p className="register-message">{message}</p>}
      </div>
    </section>
  )
}

export default Register