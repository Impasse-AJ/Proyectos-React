import { useMemo, useState } from "react";

export default function FormularioPost({ onAgregar, miUserId, titulosExistentes }) {
  // Estado de los inputs del formulario
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Estado para mostrar errores del formulario en pantalla
  const [errorForm, setErrorForm] = useState("");

  // Constantes de validación (según requisitos)
  const MAX_TITULO = 50;
  const MIN_BODY = 10;
  const MAX_BODY = 500;

  // Contadores para el body (para informar al usuario)
  const bodyLen = body.length;
  const restantes = MAX_BODY - bodyLen;

  // Creamos una lista en minúsculas para comparar duplicados sin problemas de mayúsculas
  const titulosNormalizados = useMemo(() => {
    return titulosExistentes.map((t) => t.trim().toLowerCase());
  }, [titulosExistentes]);

  // Validación del formulario (devuelve un mensaje si hay error, o "" si todo ok)
  const validar = () => {
    const t = title.trim();
    const b = body.trim();

    // 1) Título no vacío
    if (t.length === 0) return "El título no puede estar vacío.";

    // 2) Título no puede superar 50 caracteres
    if (t.length > MAX_TITULO) return "El título no puede superar 50 caracteres.";

    // 3) Título no duplicado
    if (titulosNormalizados.includes(t.toLowerCase())) return "Ya existe un post con ese título.";

    // 4) Body entre 10 y 500 caracteres
    if (b.length < MIN_BODY) return "El contenido (body) debe tener al menos 10 caracteres.";
    if (b.length > MAX_BODY) return "El contenido (body) no puede superar 500 caracteres.";
    
    // Si todo ok, devolvemos cadena vacía
    return "";
  };

  // Se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validamos antes de agregar
    const msg = validar();
    if (msg) {
      setErrorForm(msg);
      return;
    }

    // Si todo ok, limpiamos el error y avisamos al padre (App) para crear el post
    setErrorForm("");
    onAgregar({
      title: title.trim(),
      body: body.trim(),
    });

    // Feedback (requisito)
    alert("Post añadido correctamente ✅");

    // Limpiamos el formulario
    setTitle("");
    setBody("");
  };
  // Renderizamos el formulario con los campos controlados y mostrando errores o contadores según corresponda
  return (
    <section className="card">
      <h2 className="sectionTitle">Crear Nuevo Post</h2>

      {/* Mostramos el userId actual para que se vea claramente */}
      <p className="hint">
        * El post se publicará con tu ID de usuario: <strong>{miUserId ?? "-"}</strong>
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="fieldCol">
          <label>Título (máx. {MAX_TITULO}):</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe un título..."
            maxLength={MAX_TITULO + 5} // solo para no escribir infinito, pero validamos igualmente
          />
          <div className="counter">
            {title.trim().length}/{MAX_TITULO}
          </div>
        </div>

        <div className="fieldCol">
          <label>Contenido ({MIN_BODY} a {MAX_BODY}):</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escribe el contenido del post..."
            rows={1}
          />
          <div className={`counter ${restantes < 0 ? "counter-bad" : ""}`}>
            {bodyLen}/{MAX_BODY} · Restantes: {restantes}
          </div>
        </div>

        {/* Error del formulario */}
        {errorForm && <p className="status status-error">{errorForm}</p>}

        <button type="submit" className="btn btn-primary">
          Publicar Post
        </button>
      </form>
    </section>
  );
}
