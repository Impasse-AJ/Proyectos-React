import { useState } from "react";
import "./App.css";

export default function App() {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  // Estado del listado (array de objetos)
  const [personas, setPersonas] = useState([]);

  const darDeAlta = (e) => {
    e.preventDefault();

    // Validación mínima
    if (nombre.trim() === "" || edad === "") return;

    const nuevaPersona = {
      id: Date.now(), // requisito: id único con marca de tiempo
      nombre: nombre.trim(),
      edad: Number(edad),
    };

    // Requisito: NO modificar array original (usar spread)
    setPersonas([...personas, nuevaPersona]);

    // Requisito: limpiar campos automáticamente
    setNombre("");
    setEdad("");
  };

  return (
    <div className="container">
      <h2>Dar de alta personas</h2>

      <form className="form" onSubmit={darDeAlta}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          min="0"
        />

        <button type="submit">Dar de alta</button>
      </form>

      <h3>Listado Actual</h3>

      <ul>
        {personas.map((persona) => (
          <li key={persona.id}>
            {persona.nombre} — {persona.edad} años
          </li>
        ))}
      </ul>
    </div>
  );
}
