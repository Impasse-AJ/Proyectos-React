export default function LibroLista({ lista, onEliminar }) {
  if (lista.length === 0) {
    return <p className="empty">No hay libros registrados.</p>;
  }

  return (
    <div className="lista">
      {lista.map((libro) => (
        <div className="item" key={libro.id}>
          <div>
            <p className="itemTitle">{libro.titulo}</p>
            <p className="itemSub">Autor: {libro.autor}</p>
          </div>

          <button className="btn btn-red" onClick={() => onEliminar(libro.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
