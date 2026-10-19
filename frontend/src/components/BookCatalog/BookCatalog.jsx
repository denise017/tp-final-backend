import './BookCatalog.css'

function BookCatalog({ books, onAddToCart }) {
  return (
    <section className="catalogo" id="catalogo">
      <div className="catalogo-header">
        <div>
          <p className="catalogo-label">MIDNIGHT BOOKS</p>
          <h2>EXPLORA NUESTROS LIBROS</h2>
        </div>
      </div>

      <div className="catalogo-books">
        {books.map(book => (
          <article className="book-card" key={book._id}>
            <img
              src={book.cover}
              alt={`Portada de ${book.title}`}
            />

            <div className="book-info">
              <p className="book-author">{book.author}</p>
              <h3>{book.title}</h3>

              <p className="book-price">
                ${book.price.toLocaleString('es-AR')}
              </p>

              <button
                className="book-add-button"
                onClick={() => onAddToCart(book)}
              >
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BookCatalog