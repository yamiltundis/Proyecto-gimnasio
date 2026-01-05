import '../estilos/crearClasePage.css';
import { useState, useEffect } from 'react';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearClasePage() {
  const [formData, setFormData] = useState({
    nombre: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos de la clase:', formData);

    try {
      const response = await fetch('http://localhost:3000/tiposclase', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al crear clase');
      }

      const resultado = await response.json();
      console.log('Clase creada:', resultado);

      setFormData({
        nombre: ''
      });

    } catch (error) {
      console.error('Error al enviar clase:', error);
    }
  };


  return (
    <>
      <h1 className="crearclasepage-h1">Crear clase</h1>
      <form className="crearclasepage-formulario" onSubmit={handleSubmit}>
        <div className="crearclasepage-contenedor-inputs">
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="crearclasepage-boton-submit">
          Crear Clase
        </button>
      </form>
      <BotonRegresar />
    </>
  );
}