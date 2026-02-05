import { useEffect, useState } from "react";
import "./App.css";
import ListadoCarritos from "./ListadoCarritos";

export default function App() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarritos = async () => {
      try {
        setCargando(true);
        setError("");

        const resp = await fetch("https://fakestoreapi.com/carts");
        if (!resp.ok) throw new Error("Error al cargar los carritos");

        const data = await resp.json(); // requisito: convertir a JSON
        setCarritos(data);
      } catch (e) {
        setError(e.message || "Ha ocurrido un error");
      } finally {
        setCargando(false);
      }
    };

    fetchCarritos();
  }, []);

  return (
    <div className="page">
      <div className="panel">
        <h2 className="title">Resumen de Carritos de Compra</h2>

        {cargando && <p className="info">Cargando carritos...</p>}
        {error && <p className="error">{error}</p>}

        {!cargando && !error && <ListadoCarritos carritos={carritos} />}
      </div>
    </div>
  );
}
