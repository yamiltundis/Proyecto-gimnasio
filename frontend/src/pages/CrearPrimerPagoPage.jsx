import '../estilos/crearpagopage.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearPrimerPagoPage() {
  const [formData, setFormData] = useState({
    fecha: '',
    tipoMembreciaId: ''
  });
  const location = useLocation();
  const clienteData = location.state?.clienteData 

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

    try {
        // 1. Crear cliente
        const dataCliente = new FormData();
        dataCliente.append("nombre", clienteData.nombre);
        dataCliente.append("apellido", clienteData.apellido);
        dataCliente.append("email", clienteData.email);
        dataCliente.append("dni", clienteData.dni);
        dataCliente.append("fechaNacimiento", clienteData.fechaNacimiento);

        if (clienteData.foto) {
          dataCliente.append("foto", clienteData.foto);
        }

        const resCliente = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataCliente
        })
        if (!resCliente.ok) {
            throw new Error('Error al crear al cliente')
        }
        const nuevoCliente = await resCliente.json()
        console.log("Cliente creado", nuevoCliente)

        // 2. Crear Pago
        const payloadPago = {
            tipoMembreciaId: Number(formData.tipoMembreciaId),
            fecha: formData.fecha 
            ? new Date(formData.fecha).toISOString() 
            : null,
            clienteId: nuevoCliente.usuario.id
        }

        const resPago = await fetch('http://localhost:3000/pagos', {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(payloadPago)
        });

        if (!resPago.ok) {
          throw new Error('Error al crear el pago');
        }

        const nuevoPago = await resPago.json();
        console.log('Pago creado:', nuevoPago);

        setFormData({
          fecha: '',
          tipoMembreciaId: ''
        });

    } catch (error) {
      console.error('Error al crear el cliente o el pago:', error);
    }
  };


  return (
    <>
      <h1 className="crearpagopage-h1">Crear primer Pago para el cliente {clienteData?.nombre} {clienteData?.apellido} </h1>
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
    </>
  );
}