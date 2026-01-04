import '../estilos/asistenciasPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function AsistenciasPage () {

    const [asistencias, setAsistencias] = useState([])
   
    useEffect(() => {
      const fetchAsistencias= async () => {
        try {
          const response = await fetch('http://localhost:3000/asistencias')
          if (!response.ok) {
            throw new Error('Error al traer asistencias')
          }
          const data = await response.json()

          setAsistencias(data.asistencias)
        } catch (error) {
          console.error(error)
        }
      }

      fetchAsistencias()
    }, [])

    const agregarAsistencias = (data) => {
      setAsistencias([...asistencias, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const fechaFormateada = fechaISO.replace('T', ' ').replace('Z', '')
      return fechaFormateada.slice(0, 16) // YYYY-MM-DD HH:mm
    }


    return (
        <>
          <h1 className='asistenciaspage-h1'> Gestión de Asistencias </h1>

          <div className='asistenciaspage-contenedor-barra-busqueda-y-boton-nuevo-asistencia'>
            <div className="asistenciaspage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por cliente' className='asistenciaspage-input-busqueda'></input>
            </div>
            <Link to="/admin/asistencias/crear">
            <div className='asistenciaspage-boton-nuevo-asistencia'>
               <i className='bi bi-plus'></i>
               <button className='asistenciaspage-texto-boton-nuevo-asistencia'> Nueva Asistencia </button>            
            </div>
            </Link>
          </div>

           <div className='asistenciaspage-contenedor-tabla'>
             <table className='asistenciaspage-tabla'>
                <thead>
                    <tr>
                        <th> Fecha y Hora</th>
                        <th> Cliente </th>
                        {/* <th> Acciones</th> */}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(asistencias) && asistencias.map((a) => (
                        <tr key={a.id}>
                           <td> {formatearFecha(a.fechaHora)} </td>
                           <td> {a.cliente.nombre} {a.cliente.apellido} </td>
                           {/*<td className='asistenciaspage-columna-acciones'>
                              {/*<Link to={`/admin/clientes/${a.id}`}>
                                <button className='asistenciaspage-boton-ver-info'> Ver info </button> 
                              </Link>
                           </td> */}                        
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
        </>
    )
}