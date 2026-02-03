export default function EmpleadoLista({ lista, onEliminar }) {
  return (
    <div className="lista-container">
      <h3>Empleados Activos</h3>

      {lista.length === 0 ? (
        <p className="empty">No hay empleados registrados.</p>
      ) : (
        <ul className="lista">
          {lista.map((emp) => (
            <li key={emp.id} className="item">
              <span>
                <strong>{emp.nombre}</strong> ({emp.puesto})
              </span>

              <button className="btn-eliminar" onClick={() => onEliminar(emp.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
