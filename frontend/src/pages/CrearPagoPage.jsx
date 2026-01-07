import '../estilos/crearpagopage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearPagoPage() {

  const [mostrarModal, setMostrarModal] = useState(false) // estado para mostrar modal de creacion de pago
  const [formData, setFormData] = useState({
    fecha: '',
    clienteId: '',
    tipoMembreciaId: ''
  });
  
  const [pagoCreado, setPagoCreado] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del pago:', formData);

    const payload = {
        ...formData,
        clienteId: Number(formData.clienteId),
        tipoMembreciaId: Number(formData.tipoMembreciaId),
        fecha: formData.fecha 
        ? new Date(formData.fecha).toISOString() 
        : null
    }
    ;
    try {
      const response = await fetch('http://localhost:3000/pagos', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear el pago');
      }

      const resultado = await response.json();
      setPagoCreado(resultado)
      console.log('Pago creado:', resultado);

      setFormData({
        fecha: '',
        clienteId: '',
        tipoMembreciaId: ''
      });

    } catch (error) {
      console.error('Error al enviar pago:', error);
    }
    setMostrarModal(true)
  };


  return (
    <>
      <h1 className="crearpagopage-h1">Crear Pago</h1>
      <form className="crearpagopage-formulario" onSubmit={handleSubmit}>
        <div className="crearpagopage-contenedor-inputs">
          <label>
            Fecha y hora:
            <input
              type="datetime-local"
              name="fecha"
              placeholder="Ingrese la fecha"
              value={formData.fecha}
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

          <label>
            TipoMembreciaId
            <input
              type="number"
              name="tipoMembreciaId"
              placeholder="Ingrese el id del tipo de membrecia"
              value={formData.tipoMembreciaId}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="crearpagopage-boton-submit">
          Crear Pago
        </button>
      </form>
      <BotonRegresar />
      {mostrarModal && pagoCreado && (
         <div className="pagospage-modal-overlay">
              <div className="pagospage-modal">
                <h2>
                  El pago del cliente fue creado correctamente!
                </h2>
                <i className="bi bi-check-circle-fill icono-verde"></i>
                <Link to="/admin/pagos">
                  <span onClick={() => setMostrarModal(false)} className="pagospage-link-cerrar-modal"> Volver al listado de pagos </span>
                </Link>
              </div>
         </div>
      )}
    </>
  );
}