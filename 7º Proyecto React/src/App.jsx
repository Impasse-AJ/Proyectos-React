import { useEffect, useState } from "react";
import "./App.css";
import LibroForm from "./LibroForm";
import LibroLista from "./LibroLista";

export default function App() {
  const [libros, setLibros] = useState([
    { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
    { id: 2, titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez" },
    { id: 3, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón" },
  ]);

  const [modoOscuro, setModoOscuro] = useState(false);

  // Requisito: usar useEffect para implementar el cambio de colores
  useEffect(() => {
    document.body.classList.toggle("dark", modoOscuro);
  }, [modoOscuro]);

  const agregarLibro = (nuevoLibro) => {
    const libroConId = { ...nuevoLibro, id: Date.now() };
    setLibros([...libros, libroConId]); // no mutar
  };

  const eliminarLibro = (id) => {
    setLibros(libros.filter((l) => l.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">📚 Mi Biblioteca</h1>

        <button className="btn" onClick={() => setModoOscuro((v) => !v)}>
          {modoOscuro ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </header>

      <section className="card">
        <h2 className="sectionTitle">Alta de Libro</h2>
        <LibroForm onAgregar={agregarLibro} />
      </section>

      <hr className="sep" />

      <section className="card">
        <h2 className="sectionTitle">Libros en el Catálogo</h2>
        <LibroLista lista={libros} onEliminar={eliminarLibro} />
      </section>
    </div>
  );
}
