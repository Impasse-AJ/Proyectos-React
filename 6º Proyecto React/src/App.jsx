import { useEffect, useState } from "react";
import "./App.css";
import ListadoCarritos from "./ListadoCarritos";

const API_URL = "https://fakestoreapi.com/carts";

export default function App() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarritos = async () => {
      try {
        setCargando(true);
        setError("");

        const resp = await fetch(API_URL);

        if (!resp.ok) throw new Error("Error al cargar los carritos");

        const data = await resp.json(); // requisito: convertir a JSON
        setCarritos(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || String(e));
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

     {error ? (
      <p className="status status-error">{error}</p>
    ) : cargando ? (
      <p className="status status-info">Cargando carritos...</p>
    ) : (
      <ListadoCarritos carritos={carritos} />
    )}

        
      </div>
    </div>
  );
}
