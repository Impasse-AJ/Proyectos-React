import BoletinNotas from "./BoletinNotas";

export default function FichaAlumno({ nombre, curso, asignaturas, notas, asistencia }) {
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

      {/* Componente nieto */}
      <BoletinNotas notas={notas} asistencia={asistencia} />
    </section>
  );
}