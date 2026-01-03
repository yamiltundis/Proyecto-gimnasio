import '../estilos/crearclientepage.css';
import { useState, useEffect, use } from 'react';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearClientePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    fechaNacimiento: '',
    foto:''
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
      console.log('Datos del cliente:', formData);
      const payload = {
        ...formData,
        dni: Number(formData.dni),
        fechanacimiento: formData.fechaNacimiento 
        ? new Date(formData.fechaNacimiento).toISOString() 
        : null

      };


    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear cliente');
      }

      const resultado = await response.json();
      console.log('Cliente creado:', resultado);

      // Limpiar el formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        dni: '',
        fechaNacimiento: '',
        foto: ''
      });
   
      // Podés redirigir o mostrar un mensaje de éxito si querés
    } catch (error) {
      console.error('Error al enviar cliente:', error);
    }
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

          <label>
            Fecha de nacimiento:
            <input
              type="date"
              name="fechaNacimiento"
              placeholder="Ingrese su fecha de nacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Foto:
            <input
              type="text"
              name="foto"
              placeholder="Ingrese una foto"
              value={formData.foto}
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