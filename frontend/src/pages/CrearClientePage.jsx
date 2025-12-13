import '../estilos/crearclientepage.css';
import { useState } from 'react';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearClientePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del cliente:', formData);
    // Acá podrías enviar los datos a una API o guardarlos en estado global
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      dni: ''      
    })
  };

  return (
    <>
      <h1 className="crearclientepage-h1">Crear Cliente</h1>
      <form className="crearclientepage-formulario" onSubmit={handleSubmit}>
        <div className="crearclientepage-contenedor-inputs">
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

          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              placeholder="Ingrese el apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Ingrese el email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            DNI:
            <input
              type="number"
              name="dni"
              placeholder="Ingrese el DNI"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="crearclientepage-boton-submit">
          Crear Cliente
        </button>
      </form>
      <BotonRegresar />
    </>
  );
}