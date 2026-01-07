import '../estilos/claseEspecificaPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar'

export function ClasesEspecificasPage () {
    const { id } = useParams(); 
    const [clases, setClases] = useState([])
   
    useEffect(() => {
      const fetchClases = async () => {
        try {
          const response = await fetch(`http://localhost:3000/clasesespecificas?tipoClase=${id}`)
          if (!response.ok) {
            throw new Error('Error al traer clases')
          }
          const data = await response.json()

          {/*
          const clientesConEstado = await Promise.all(
            data.usuarios.map(async (c) => {
              try {
                const estadoResponse = await fetch(`http://localhost:3000/membreciasActivas/${c.id}`)
                if (!estadoResponse.ok) {
                  throw new Error('Error al traer estado')
                }
                const estadoData = await estadoResponse.json()
                return { ...c, estado: estadoData.diasRestantes.estado } // combinamos cliente + estado
              } catch (error) {
                return { ...c, estado: 'Desconocido' } // fallback
              }
            })
          ) */}

          setClases(data.clasesEspecificas)
        } catch (error) {
          console.error(error)
        }
      }

      fetchClases()
    }, [])



    const eliminarClase = (id) => {
      setClases(clases.filter(c => c.id !== id))
    }

    const agregarClase = (data) => {
      setClases([...clases, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const fechaFormateada = fechaISO.replace('T', ' ').replace('Z', '')
      return fechaFormateada.slice(0, 16) // 👉 YYYY-MM-DD HH:mm
    }


    return (
        <>
          <h1 className='clasesespecificaspage-h1'> Clases especificas  </h1>

          <div className='clasesespecificaspage-contenedor-barra-busqueda-y-boton-nuevo-claseespecifica'>
            <div className="clasesespecificaspage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por nombre o DNI' className='clasesespecificaspage-input-busqueda'></input>
            </div>
            <Link to={`/admin/clases/${id}/crear`}>
            <div className='clasesespecificaspage-boton-nuevo-claseespecifica'>
               <i className='bi bi-plus'></i>
               <button className='clasesespecificaspage-texto-boton-nuevo-claseespecifica'> Nueva Clase </button>            
            </div>
            </Link>
          </div>

           <div className='clasesespecificaspage-contenedor-tabla'>
             <table className='clasesespecificaspage-tabla'>
                <thead>
                    <tr>
                        <th> Fecha y hora </th>
                        <th> Estado </th>
                        <th> Cupo máximo </th>
                        <th> Cantidad de reservas </th>
                        <th> Cantidad de asistencias </th>
                        <th> Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(clases) && clases.map((c) => (
                        <tr key={c.id}>
                           <td> {formatearFecha(c.diaHora)} </td>
                           <td>
                            <span className={`clasesespecificaspage-estado-badge estado-${c.estado}`}>
                               {c.estado}
                            </span>
                           </td>
                           <td> {c.cantmax} </td>
                           <td> {c.cantidadReservas} </td>
                           <td> </td> 
                           <td className='clasesespecificaspage-columna-acciones'>
                              <Link to={`/admin/clases/${c.id}/reservas`}>
                                <span className='clasesespecificaspage-link-ver-reservas'> Ver reservas </span> 
                              </Link>
                              <Link to={`/admin/clientes/${c.id}`}>
                                <span className='clasesespecificaspage-link-ver-asistencias'> Ver asistencias </span> 
                              </Link>
                           </td>                         
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
           <BotonRegresar />
        </>
    )
}