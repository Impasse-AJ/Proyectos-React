export default function BoletinNotas({ notas, asistencia }) {
  const { parcial, proyecto } = notas;

  // Nota final: parcial 60% + proyecto 40%
  const notaFinal = parcial * 0.6 + proyecto * 0.4;

  // Requisito: si asistencia > 70%, mostrar advertencia en rojo
  const mostrarRiesgo = asistencia > 70;

  return (
    <section className="boletin">
      <p className="boletinTitle">Resumen Académico:</p>

      <p className="row">
        Examen Parcial: <strong>{parcial}</strong>
      </p>
      <p className="row">
        Proyecto Final: <strong>{proyecto}</strong>
      </p>

      <p className="final">
        Nota Final: <strong>{notaFinal.toFixed(2)}</strong>
      </p>

      <p className="row">Asistencia: {asistencia}%</p>

      {mostrarRiesgo && (
        <p className="warning">
          <span className="warningIcon">⚠</span> Riesgo por faltas
        </p>
      )}
    </section>
  );
}