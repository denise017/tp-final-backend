import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      onLogin(data.usuario)
    } else {
      setMessage(data.mensaje)
    }
  }

  return (
    <section className="login" id="login">
      <div className="login-box">
        <p className="login-label">MIDNIGHT BOOKS</p>
        <h2>INICIAR SESIÓN</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Iniciar sesión</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </section>
  )
}

export default Login