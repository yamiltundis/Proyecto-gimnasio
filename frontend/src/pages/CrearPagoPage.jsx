import '../estilos/crearpagopage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';
import { useFetch } from '../hooks/useFetch';
import Select from 'react-select';

export function CrearPagoPage() {

  const [mostrarModal, setMostrarModal] = useState(false) // estado para mostrar modal de creacion de pago
  const [formData, setFormData] = useState({
    fecha: '',
    clienteId: '',
    tipoMembreciaId: ''
  });

  const url = 'http://localhost:3000/usuarios';
  const { data: clienteData, loading: clienteLoading, error: clienteError } = useFetch(url, {}, { requireAuth: true });
  const clientes = clienteData?.usuarios || [];

  const urlMembrecia = 'http://localhost:3000/tiposmembrecia';
  const { data, loading, error } = useFetch(urlMembrecia, {}, { requireAuth: true });
  const membrecias = data?.tiposmembrecias || [];
  
  const [pagoCreado, setPagoCreado] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData)
  };

  const options = clientes.map(c => ({
    value: c.id,
    label: `${c.nombre} ${c.apellido} - ${c.dni}`
  }));

    const optionsMembrecias = membrecias.map(m => ({
    value: m.id,
    label: m.nombre
  }));

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
    };

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
            Cliente
              <Select
                options={options}
                onChange={option => handleChange({ target: {
                                      name: "clienteId",
                                      value: option.value
                                    }
                                  })
                        }
                placeholder="Buscar cliente..."
                isSearchable
              />
          </label>

          <label>
            TipoMembresia
            <Select
              options={optionsMembrecias}
              onChange={option => handleChange({
                                    target: {
                                      name: "tipoMembreciaId",
                                      value: option.value
                                    }
                                  })
                        }
              placeholder="Buscar membresia..."
              isSearchable
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