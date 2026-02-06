import { useState } from "react";

export default function LibroForm({ onAgregar }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titulo.trim() === "" || autor.trim() === "") return;

    onAgregar({
      titulo: titulo.trim(),
      autor: autor.trim(),
    });

    setTitulo("");
    setAutor("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del libro"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <button className="btn btn-green" type="submit">
        Guardar
      </button>
    </form>
  );
}
