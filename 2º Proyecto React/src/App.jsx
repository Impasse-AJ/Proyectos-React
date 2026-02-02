import { useState } from "react";
import "./App.css";

export default function App() {
  const productos = [
    { id: 1, nombre: "Laptop Gamer", precio: 1200, stock: 5 },
    { id: 2, nombre: "Mouse Óptico", precio: 25, stock: 0 },
    { id: 3, nombre: "Monitor 4K", precio: 600, stock: 3 },
    { id: 4, nombre: "Teclado Mecánico", precio: 80, stock: 10 },
    { id: 5, nombre: "Cable HDMI", precio: 15, stock: 0 },
  ];

  // true → menor a mayor | false → mayor a menor
  const [ascendente, setAscendente] = useState(true);

  const productosDisponibles = productos
    .filter((producto) => producto.stock > 0)
    .sort((a, b) =>
      ascendente ? a.precio - b.precio : b.precio - a.precio
    );

  return (
    <div className="container">
      <h2>Catálogo de Productos Disponibles</h2>

      {/* Botón versión 2 */}
      <button className="btn" onClick={() => setAscendente(!ascendente)}>
        Ordenar por precio: {ascendente ? "Menor a Mayor" : "Mayor a Menor"}
      </button>

      <ul>
        {productosDisponibles.map((producto) => (
          <li key={producto.id}>
            <span className={producto.precio > 500 ? "caro" : ""}>
              {producto.nombre}
            </span>{" "}
            - ${producto.precio} ({producto.stock} unidades)
          </li>
        ))}
      </ul>
    </div>
  );
}
