import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-content">
        <div className="navbar-links">
          <a href="#inicio">Inicio</a>
          <a href="#catalogo">Catálogo</a>
        </div>

        <a href="#inicio" className="navbar-logo">
          <img src="/images/icons/cat.svg" alt="" />
          <span>MIDNIGHT BOOKS</span>
        </a>

        <div className="navbar-links navbar-right">
          <a href="#registro">Crea una cuenta</a>

          <a
            href="#login"
            className="navbar-icon"
            aria-label="Iniciar sesión"
            title="Iniciar sesión"
          >
            <img src="/images/icons/user.svg" alt="" />
          </a>

          <a
            href="#carrito"
            className="navbar-icon"
            aria-label="Carrito"
            title="Carrito"
          >
            <img src="/images/icons/cart.svg" alt="" />
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar