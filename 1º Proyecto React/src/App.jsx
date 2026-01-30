import "./App.css";
import FichaAlumno from "./components/FIchaAlumno.js";

export default function App() {
  // Datos del alumno (los define App como dice el enunciado)
  const nombreEstudiante = "Lucas García";
  const curso = "2º Desarrollo de Aplicaciones Web";
  const asignaturas = ["React JS", "Bases de Datos", "Desarrollo Interfaces"];

  const registroAcademico = {
    notas: { parcial: 8.5, proyecto: 9.2 },
    presencialidad: 75,
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Panel de Administración Escolar</h1>

        <div className="frame">
          <FichaAlumno
            nombre={nombreEstudiante}
            curso={curso}
            asignaturas={asignaturas}
            notas={registroAcademico.notas}
            asistencia={registroAcademico.presencialidad}
          />
        </div>
      </div>
    </div>
  );
}