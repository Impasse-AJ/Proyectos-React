import { useState } from "react";

export default function EmpleadoForm({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación mínima
    if (nombre.trim() === "" || puesto.trim() === "") return;

    // Generar evento hacia arriba (App)
    onAgregar({
      nombre: nombre.trim(),
      puesto: puesto.trim(),
    });

    // Limpiar campos
    setNombre("");
    setPuesto("");
  };

  return (
    <div className="form-container">
      <h3>Añadir Nuevo Empleado:</h3>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>

        <div className="field">
          <label>Puesto:</label>
          <input
            type="text"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            placeholder="Puesto"
          />
        </div>

        <button type="submit" className="btn">
          Agregar
        </button>
      </form>
    </div>
  );
}
