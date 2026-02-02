import { useState } from "react";
import BoletinNotas from "./BoletinNotas.jsx";

export default function FichaAlumno({ nombre, curso, asignaturas, notas, asistencia }) {
  const [mostrarNotas, setMostrarNotas] = useState(false);

  const toggleNotas = () => setMostrarNotas((prev) => !prev);

  return (
    <section className="ficha">
      <p className="name">{nombre}</p>

      <p className="course">
        Curso: <strong>{curso}</strong>
      </p>

      <p className="subtitle">Asignaturas Matriculadas:</p>
      <ul className="subjects">
        {asignaturas.map((asig) => (
          <li key={asig}>{asig}</li>
        ))}
      </ul>

      <button className="btn" onClick={toggleNotas}>
        {mostrarNotas ? "Ocultar Notas" : "Mostrar Notas"}
      </button>

      {mostrarNotas && <BoletinNotas notas={notas} asistencia={asistencia} />}
    </section>
  );
}
