import '../estilos/crearClaseEspecificaPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearClaseEspecificaPage() {
  const { id } = useParams()
  const [tipoClase, setTipoClase] = useState("")
  const [formData, setFormData] = useState({
    diaHora: '',
    cantmax: '',
    tipoClaseId: id
  });

  useEffect(() => {
      const fetchTipoClase = async () => {
        try {
          const response = await fetch(`http://localhost:3000/tiposclase/${id}`)
          if (!response.ok) {
            throw new Error('Error al traer tipo de clase')
          }
          const data = await response.json()

          setTipoClase(data.tipoClase)
        } catch (error) {
          console.error(error)
        }
      }
      fetchTipoClase()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos de la clase creada:', formData);

    const payload = {
        ...formData,
        cantmax: Number(formData.cantmax),
        tipoClaseId: Number(formData.tipoClaseId),
        diaHora: formData.diaHora 
        ? new Date(formData.diaHora).toISOString() 
        : null
    };
    console.log('Datos de la clase creada:', payload);
    try {
      const response = await fetch('http://localhost:3000/clasesespecificas', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear clase especifica');
      }

      const resultado = await response.json();
      console.log('Clase específica creada:', resultado);

      setFormData({
        diaHora: '',
        cantmax: '',
        tipoClaseId: id
      });

    } catch (error) {
      console.error('Error al enviar clase especifica:', error);
    }
  };


  return (
    <>
      <h1 className="crearclaseespecificapage-h1"> Crear clase especifica de {tipoClase.nombre} </h1>
      <form className="crearclaseespecificapage-formulario" onSubmit={handleSubmit}>
        <div className="crearclaseespecificapage-contenedor-inputs">
          <label>
            Fecha y hora:
            <input
              type="datetime-local"
              name="diaHora"
              placeholder="Ingrese la fecha"
              value={formData.diaHora}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Cupo máximo
            <input
              type="number"
              name="cantmax"
              placeholder="Ingrese la cantidad máxima de participantes"
              value={formData.cantmax}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="crearclaseespecificapage-boton-submit">
          Crear clase específica
        </button>
      </form>
      <BotonRegresar />
    </>
  );
}