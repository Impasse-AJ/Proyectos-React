export default function BuscadorPosts({
  filtroTitulo,
  setFiltroTitulo,
  filtroUserId,
  setFiltroUserId,
  orden,
  setOrden,
}) {
  // Cambia el filtro del título mientras el usuario escribe (reactivo)
  const handleTituloChange = (e) => {
    setFiltroTitulo(e.target.value);
  };

  // Cambia el filtro de userId mientras el usuario escribe (reactivo)
  // Guardamos texto, y en App se convierte a Number cuando toca filtrar
  const handleUserIdChange = (e) => {
    setFiltroUserId(e.target.value);
  };

  // Cambia el tipo de ordenación a "title"
  const ordenarPorTitulo = () => {
    setOrden("title");
  };

  // Cambia el tipo de ordenación a "userId"
  const ordenarPorUserId = () => {
    setOrden("userId");
  };

  // Limpia ambos filtros
  const limpiarFiltros = () => {
    setFiltroTitulo("");
    setFiltroUserId("");
  };

  return (
    <section className="card">
      <h2 className="sectionTitle">Búsqueda y Ordenación</h2>

      <div className="grid">
        <div className="field">
          <label>Título:</label>
          <input
            type="text"
            value={filtroTitulo}
            onChange={handleTituloChange}
            placeholder="Buscar por título..."
          />
        </div>

        <div className="field">
          <label>ID Usuario:</label>
          <input
            type="number"
            value={filtroUserId}
            onChange={handleUserIdChange}
            placeholder="Ej: 3"
            min="1"
          />
        </div>
      </div>

      <div className="actions">
        {/* Ordenación */}
        <button
          className={`btn ${orden === "title" ? "btn-active" : ""}`}
          onClick={ordenarPorTitulo}
          type="button"
        >
          Ordenar por Título (A-Z)
        </button>

        <button
          className={`btn ${orden === "userId" ? "btn-active" : ""}`}
          onClick={ordenarPorUserId}
          type="button"
        >
          Ordenar por User ID
        </button>

        {/* Limpieza */}
        <button className="btn btn-danger" onClick={limpiarFiltros} type="button">
          Limpiar filtros
        </button>
      </div>

      <p className="hint">
        * El filtrado es automático mientras escribes (reactivo).
      </p>
    </section>
  );
}
