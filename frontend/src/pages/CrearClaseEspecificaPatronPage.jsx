import '../estilos/crearClaseEspecificaPatronPage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';

export function CrearClaseEspecificaPatronPage() {
  const { id } = useParams();
  const [tipoClase, setTipoClase] = useState("");
  const [mostrarModalDias, setMostrarModalDias] = useState(false);
  const [formData, setFormData] = useState({
    hora: '',
    cantmax: '',
    tipoClaseId: id,
    fechaInicio: '',
    fechaFin: '',
    diasSemana: []
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
     const { name, value, type, checked } = e.target;

     if (name === "diasSemana") {
       setFormData((prev) => ({
         ...prev,
         diasSemana: checked
           ? [...prev.diasSemana, value]
           : prev.diasSemana.filter((dia) => dia !== value)
       }));
     } else {
       setFormData((prev) => ({
         ...prev,
         [name]: value
       }));
     }
     console.log("formData actualizado:", formData);
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
        hora: '',
        cantmax: '',
        tipoClaseId: id,
        fechaInicio: '',
        fechaFin: '',
        diasSemana: []
      });

    } catch (error) {
      console.error('Error al enviar clase especifica:', error);
    }
  };


  return (
    <>
      <h1 className="crearclaseespecificapatronpage-h1"> Crear clases de {tipoClase.nombre} con un patrón </h1>
      <form className="crearclaseespecificapatronpage-formulario" onSubmit={handleSubmit}>
        <div className="crearclaseespecificapatronpage-contenedor-inputs">
          <label>
            Fecha inicio:
            <input
              type="date"
              name="fechaInicio"
              placeholder="Ingrese la fecha de inicio del patrón"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Fecha fin:
            <input
              type="date"
              name="fechaFin"
              placeholder="Ingrese la fecha de fin del patrón"
              value={formData.fechaFin}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Horario:
            <input
              type="time"
              name="hora"
              placeholder="Ingrese el horario"
              value={formData.hora}
              onChange={handleChange}
              required
            />
          </label>

          <button type="button" onClick={() => setMostrarModalDias(true)}> Seleccionar días </button>
          {mostrarModalDias && (
            <div className="crearclaseespecificapatronmodal-overlay">
              <div className="crearclaseespecificapatronmodal-contenido">
                <h3>Días de la semana</h3>
                {["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"].map((dia) => (
                  <label key={dia}>
                    <input
                      type="checkbox"
                      name="diasSemana"
                      value={dia}
                      checked={formData.diasSemana.includes(dia)}
                      onChange={handleChange}
                    />
                    {dia}
                  </label>
                ))}
                <button onClick={() => setMostrarModalDias(false)}>Cerrar</button>
              </div>
            </div>
          )}

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

        <button type="submit" className="crearclaseespecificapatronpage-boton-submit">
          Crear clase específica
        </button>
      </form>
      <BotonRegresar />
    </>
  );
}