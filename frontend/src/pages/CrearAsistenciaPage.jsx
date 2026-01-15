import '../estilos/crearAsistenciaPage.css';
import { useState, useEffect } from 'react';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearAsistenciaPage() {
  const [formData, setFormData] = useState({
    fechaHora: '',
    clienteId: ''
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
    console.log('Datos de la asistencia:', formData);

    const payload = {
        ...formData,
        clienteId: Number(formData.clienteId),
        fechaHora: formData.fechaHora 
        ? new Date(formData.fechaHora).toISOString() 
        : null
    };
    
    try {
      const response = await fetch('http://localhost:3000/asistencias', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear la asistencia');
      }

      const resultado = await response.json();
      console.log('Asistencia creada:', resultado);

      setFormData({
        fechaHora: '',
        clienteId: ''
      });

    } catch (error) {
      console.error('Error al crear asistencia:', error);
    }
  };


  return (
    <>
      <h1 className="crearasistenciapage-h1"> Crear Asistencia </h1>
      <form className="crearasistenciapage-formulario" onSubmit={handleSubmit}>
        <div className="crearasistenciapage-contenedor-inputs">
          <label>
            Fecha y hora:
            <input
              type="datetime-local"
              name="fechaHora"
              placeholder="Ingrese la fecha y hora"
              value={formData.fechaHora}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            ClienteId
            <input
              type="number"
              name="clienteId"
              placeholder="Ingrese el id del cliente"
              value={formData.clienteId}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="crearasistenciapage-boton-submit">
          Crear Asistencia
        </button>
      </form>
      <BotonRegresar />
    </>
  );
}