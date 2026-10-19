import './Navbar.css'

function Navbar({ usuario, onLogout }) {
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

           {usuario ? (
            <>
            <span>Bienvenido, {usuario.name}</span>
            <button className="navbar-logout" onClick={onLogout}>
                Cerrar sesión
                </button>
                </>
                ) : (
                <>
                <a href="#registro">Registrarse</a>
                <a
                href="#login"
                className="navbar-icon"
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
                >
                    <img src="/images/icons/user.svg" alt="" />
                    </a>
                    </>
                )}

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