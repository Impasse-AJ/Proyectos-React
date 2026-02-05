export default function ListadoCarritos({ carritos }) {
  const formatearFecha = (fechaISO) => {
    const d = new Date(fechaISO);
    if (Number.isNaN(d.getTime())) return fechaISO;

    // Formato legible (día/mes/año) como en el ejemplo
    return d.toLocaleDateString("es-ES");
  };

  const totalProductos = (products) => {
    // suma de quantity de todos los productos del carrito
    return products.reduce((acc, p) => acc + p.quantity, 0);
  };

  return (
    <div className="listaCarritos">
      {carritos.map((carrito) => (
        <div key={carrito.id} className="carritoCard">
          <p className="carritoId">🛒 Carrito ID: {carrito.id}</p>

          <p className="carritoFecha">
            <strong>Fecha:</strong> {formatearFecha(carrito.date)}
          </p>

          <p className="productosTitulo">
            <strong>Productos:</strong>
          </p>

          <ul className="productosLista">
            {carrito.products.map((prod, idx) => (
              <li key={`${carrito.id}-${prod.productId}-${idx}`}>
                Producto ID: <strong>{prod.productId}</strong> — Cantidad:{" "}
                <strong>{prod.quantity}</strong>
              </li>
            ))}
          </ul>

          <p className="total">
            <strong>Total de Productos:</strong> {totalProductos(carrito.products)}
          </p>
        </div>
      ))}
    </div>
  );
}
