import '../estilos/crearAsistenciaPage.css';
import { useState, useEffect } from 'react';
import { BotonRegresar } from '../components/BotonRegresar';
import Select from 'react-select';
import { useFetch } from '../hooks/useFetch';
import { ModalRespuesta } from '../components/ModalRespuesta';
import { getToken } from '../helpers/auth';

export function CrearAsistenciaPage() {
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [creacionExitosa, setCreacionExitosa] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/usuarios`;
  const { data: clienteData, loading: clienteLoading, error: clienteError } = useFetch(url, {}, { requireAuth: true });
  const clientes = clienteData?.usuarios || [];

  const options = clientes.map(c => ({
    value: c.id,
    label: `${c.nombre} ${c.apellido} - ${c.dni}`
  }));

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
      const token = getToken();
      const response = await fetch(`${API_URL}/asistencias`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear la asistencia');
      }

      const resultado = await response.json();
      setCreacionExitosa(true)
      console.log('Asistencia creada:', resultado);

      setFormData({
        fechaHora: '',
        clienteId: ''
      });

    } catch (error) {
      console.error('Error al crear asistencia:', error);
      setCreacionExitosa(false)
    } finally {
      setMostrarModal(true)
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
            Cliente
            <Select
              className='crearpagopage-select'
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
        </div>

        <button type="submit" className="crearasistenciapage-boton-submit">
          Crear Asistencia
        </button>
      </form>
      <BotonRegresar />
      {mostrarModal && (
        <ModalRespuesta
          frase={ creacionExitosa ? "La asistencia fue creada correctamente!" : "La asistencia no se pudo cargar" }
          exito={creacionExitosa}
          link="/admin/asistencias"
          textoLink="Volver al listado de asistencias"
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
}