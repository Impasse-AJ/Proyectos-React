import { useEffect, useMemo, useState } from "react";
import "./App.css";

// Componentes (los crearemos en los siguientes pasos, archivo por archivo)
import FormularioPost from "./components/    FormularioPost.jsx";
import BuscadorPosts from "./components/    BuscadorPosts.jsx";
import ListadoPosts from "./components/    ListadoPosts.jsx";

// URL de la API (requisito)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Clave para guardar posts locales (ampliación)
const LS_KEY = "panel_moderacion_posts_locales";

export default function App() {
  // =========================
  // 1) ESTADO PRINCIPAL
  // =========================

  // Posts cargados desde API (solo los primeros 20)
  const [postsApi, setPostsApi] = useState([]);
  // Copia para "restaurar" los posts API (ampliación)
  const [postsApiOriginal, setPostsApiOriginal] = useState([]);

  // Posts creados por el usuario (ampliación: se guardan en localStorage)
  const [postsLocales, setPostsLocales] = useState([]);

  // Estado de carga y error
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Filtros (buscador dual)
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroUserId, setFiltroUserId] = useState("");

  // Ordenación (por defecto: numérica por userId)
  const [orden, setOrden] = useState("userId"); // "userId" | "title"

  // Temporizador de sesión (segundos)
  const [segundosSesion, setSegundosSesion] = useState(0);

  // ID de usuario actual (miUserId) que NO se puede repetir con los userId de la API (1-10)
  const [miUserId, setMiUserId] = useState(null);

  // =========================
  // 2) EFECTOS: CARGA INICIAL
  // =========================

  // 2.1) Al iniciar: leer posts locales desde localStorage (ampliación)
  useEffect(() => {
    const guardado = localStorage.getItem(LS_KEY);

    try {
      const parseado = guardado ? JSON.parse(guardado) : [];
      // Si no es array, usamos []
      setPostsLocales(Array.isArray(parseado) ? parseado : []);
    } catch {
      setPostsLocales([]);
    }
  }, []);

  // 2.2) Al iniciar: cargar posts de la API (primeros 20)
  useEffect(() => {
    const cargarApi = async () => {
      try {
        setCargando(true);
        setError("");

        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error("No se pudieron cargar los posts de la API.");

        const data = await resp.json();

        // Por seguridad: si la API devolviera algo raro, usamos []
        const primeros20 = Array.isArray(data) ? data.slice(0, 20) : [];

        setPostsApi(primeros20);
        setPostsApiOriginal(primeros20);

        // Generamos miUserId (1..10) que NO esté en los userId presentes en los posts API
        const userIdsUsados = new Set(primeros20.map((p) => p.userId));
        const candidatos = [];

        for (let i = 1; i <= 10; i++) {
          if (!userIdsUsados.has(i)) candidatos.push(i);
        }

        // Si por lo que sea no quedan candidatos, elegimos 10 (pero normalmente habrá)
        const elegido =
          candidatos.length > 0
            ? candidatos[Math.floor(Math.random() * candidatos.length)]
            : 10;

        setMiUserId(elegido);
      } catch (e) {
        // Manejo de error simple y seguro (junior-friendly)
        setError(e?.message || String(e) || "Ha ocurrido un error.");
      } finally {
        setCargando(false);
      }
    };

    cargarApi();
  }, []);

  // 2.3) Temporizador: cuenta segundos desde que la app está abierta
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSegundosSesion((prev) => prev + 1);
    }, 1000);

    // Cleanup: importante para no dejar intervalos activos
    return () => clearInterval(intervalId);
  }, []);

  // 2.4) Guardar posts locales en localStorage cada vez que cambien (ampliación)
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(postsLocales));
  }, [postsLocales]);

  // 2.5) Título de la pestaña con número total de posts (ampliación)
  useEffect(() => {
    const total = postsApi.length + postsLocales.length;
    document.title = `Panel Moderación (${total})`;
  }, [postsApi.length, postsLocales.length]);

  // =========================
  // 3) DATOS DERIVADOS (FILTRADO + ORDENACIÓN)
  // =========================

  // Unimos posts locales + API (locales arriba, porque se añaden al principio)
  const postsCombinados = useMemo(() => {
    return [...postsLocales, ...postsApi];
  }, [postsLocales, postsApi]);

  // Aplicamos filtros reactivos + orden
  const postsVisibles = useMemo(() => {
    const texto = filtroTitulo.trim().toLowerCase();
    const userIdNum = filtroUserId.trim() === "" ? null : Number(filtroUserId);

    // 1) Filtrar
    let filtrados = postsCombinados.filter((p) => {
      const cumpleTitulo = texto === "" ? true : p.title.toLowerCase().includes(texto);
      const cumpleUser = userIdNum === null ? true : p.userId === userIdNum;
      return cumpleTitulo && cumpleUser;
    });

    // 2) Ordenar (sin mutar el array original)
    filtrados = filtrados.slice().sort((a, b) => {
      if (orden === "title") {
        return a.title.localeCompare(b.title);
      }
      // orden por userId (numérico)
      return a.userId - b.userId;
    });

    return filtrados;
  }, [postsCombinados, filtroTitulo, filtroUserId, orden]);

  // =========================
  // 4) ACCIONES (AGREGAR / ELIMINAR / RESTAURAR)
  // =========================

  // Agregar un post (viene validado desde el formulario, pero aquí lo guardamos)
  const agregarPost = (nuevo) => {
    // Creamos el post con estructura igual a la API
    const postFinal = {
      userId: miUserId,
      id: Date.now(), // id único local
      title: nuevo.title,
      body: nuevo.body,
      // Marcamos que es local (para saber dónde eliminar)
      esLocal: true,
    };

    // Añadir al PRINCIPIO (requisito)
    setPostsLocales((prev) => [postFinal, ...prev]);
  };

  // Eliminar un post (si es local se quita de locales, si no, se quita de API)
  const eliminarPost = (post) => {
    const ok = window.confirm("¿Seguro que quieres eliminar este post?");
    if (!ok) return;

    if (post.esLocal) {
      setPostsLocales((prev) => prev.filter((p) => p.id !== post.id));
    } else {
      setPostsApi((prev) => prev.filter((p) => p.id !== post.id));
    }
  };

  // Restaurar: borrar posts locales y volver a los 20 posts iniciales de la API (ampliación)
  const restaurarTodo = () => {
    const ok = window.confirm(
      "Esto borrará tus posts locales y restaurará los posts originales de la API. ¿Continuar?"
    );
    if (!ok) return;

    setPostsLocales([]);
    setPostsApi(postsApiOriginal);
  };

  // =========================
  // 5) UI
  // =========================

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1 className="title">Panel de Moderación</h1>
          <p className="meta">
            Usuario actual (miUserId): <strong>{miUserId ?? "-"}</strong> · Tiempo activo:{" "}
            <strong>{segundosSesion}s</strong>
          </p>
        </div>

        <button className="btn" onClick={restaurarTodo}>
          Restaurar (API + borrar locales)
        </button>
      </header>

      {/* Mensajes de estado (error tiene prioridad) */}
      {error ? (
        <p className="status status-error">{error}</p>
      ) : cargando ? (
        <p className="status status-info">Cargando posts...</p>
      ) : (
        <>
          <BuscadorPosts
            filtroTitulo={filtroTitulo}
            setFiltroTitulo={setFiltroTitulo}
            filtroUserId={filtroUserId}
            setFiltroUserId={setFiltroUserId}
            orden={orden}
            setOrden={setOrden}
          />

          <FormularioPost
            onAgregar={agregarPost}
            miUserId={miUserId}
            // Pasamos los títulos existentes para validar duplicados
            titulosExistentes={postsCombinados.map((p) => p.title)}
          />

          <ListadoPosts posts={postsVisibles} onEliminar={eliminarPost} />
        </>
      )}
    </div>
  );
}
