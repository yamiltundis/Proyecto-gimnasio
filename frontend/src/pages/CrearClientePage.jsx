import '../estilos/crearclientepage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearClientePage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    fechaNacimiento: '',
    foto:'',
    password:''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
    ...formData,
    [name]: type === "file" ? files[0] : value
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del cliente:', formData);
    const payload = {
      ...formData,
       dni: Number(formData.dni),
       fechaNacimiento: formData.fechaNacimiento 
       ? new Date(formData.fechaNacimiento).toISOString() 
      : null
    };
    navigate("/admin/pagos/crearprimerpago", { state: { clienteData: payload }});

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
              type="file"
              name="foto"
              placeholder="Ingrese una foto"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              placeholder="Ingrese la contraseña"
              value={formData.password}
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