import { useEffect, useState } from "react";

export default function DetectorTamanoVentana() {
  const [dimensiones, setDimensiones] = useState({
    ancho: window.innerWidth,
    alto: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensiones({
        ancho: window.innerWidth,
        alto: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pantallaPequena = dimensiones.ancho <= 800;

  const estilosContenedor = {
    width: "100vw",            
    minHeight: "300px",            
    backgroundColor: pantallaPequena ? "#FFEBEE" : "#E8F5E9",
    border: pantallaPequena
      ? "6px solid #B71C1C"
      : "6px solid #1B5E20",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
    padding: "20px",
  };

  const estilosCaja = {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  };

  return (
    <div style={estilosContenedor}>
      <div style={estilosCaja}>
        <p>Ancho: {dimensiones.ancho}px</p>
        <p>Alto: {dimensiones.alto}px</p>
        <p>
          {pantallaPequena
            ? "Pantalla ≤ 800px (modo rojo)"
            : "Pantalla > 800px (modo verde)"}
        </p>
      </div>
    </div>
  );
}
