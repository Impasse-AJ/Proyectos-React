import { useState } from "react";
import EmpleadoForm from "./EmpleadoForm";
import EmpleadoLista from "./EmpleadoLista";


function App() {
  // Lista de empleados en el estado del componente padre
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Ana López", puesto: "Desarrolladora Frontend" },
    { id: 2, nombre: "Carlos Ruiz", puesto: "Diseñador UX/UI" },
  ]);

  // Función para agregar un nuevo empleado.
  // Esta función se pasará al formulario.
  const handleAgregarEmpleado = (nuevoEmpleado) => {
    // Creamos un nuevo ID para el empleado
    const empleadoConId = {
      ...nuevoEmpleado,
      id: Date.now(),
    };

    // Actualizamos el estado, añadiendo el nuevo empleado a la lista existente
    setEmpleados([...empleados, empleadoConId]);
  };

  // Función para eliminar un empleado.
  // Esta función se pasará a la lista.
  const handleEliminarEmpleado = (id) => {
    // Filtramos la lista, conservando todos menos el que coincide con el 'id'
    const listaActualizada = empleados.filter((emp) => emp.id !== id);
    setEmpleados(listaActualizada);
  };

  return (
    <div className="app-container">
      <h1> Registro de Empleados</h1>
      
      {/* PASO DE PROPS Y EVENTOS:
        - Pasamos 'handleAgregarEmpleado' al formulario
          como una prop llamada 'onAgregar'.
      */}
      <EmpleadoForm onAgregar={handleAgregarEmpleado} />
      
      <hr />
      
      {/* PASO DE PROPS Y EVENTOS:
        - Pasamos la 'lista' de empleados.
        - Pasamos 'handleEliminarEmpleado' como una prop 'onEliminar'.
      */}
      <EmpleadoLista 
        lista={empleados} 
        onEliminar={handleEliminarEmpleado} 
      />
    </div>
  );
}

export default App;