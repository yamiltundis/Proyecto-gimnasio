import '../estilos/asistenciasClasePage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar';

export function AsistenciasClasePage () {
    const { id } = useParams(); 
    const [asistencias, setAsistencias] = useState([])
   
    useEffect(() => {
      const fetchAsistencias = async () => {
        try {
          const response = await fetch(`http://localhost:3000/asistenciasclases?claseEspecificaId=${id}`)
          if (!response.ok) {
            throw new Error('Error al traer asistencias de la clse')
          }
          const data = await response.json()

          setAsistencias(data.asistencias)
        } catch (error) {
          console.error(error)
        }
      }

      fetchAsistencias()
    }, [])

    const agregarAsistencia = (data) => {
      setAsistencias([...asistencias, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const fechaFormateada = fechaISO.replace('T', ' ').replace('Z', '')
      return fechaFormateada.slice(0, 16) // 👉 YYYY-MM-DD HH:mm
    }

    const conReserva = (reserva) => {
        if (reserva) {
            return '✅'
        } 
        return '❌'
    }

    return (
        <>
          <h1 className='asistenciasclasepage-h1'> Asistencias clase {id} </h1>

          <div className='asistenciasclasepage-contenedor-barra-busqueda-y-boton-nuevo-asistenciaclase'>
            <div className="asistenciasclasepage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por nombre o DNI' className='asistenciasclasepage-input-busqueda'></input>
            </div>
            <Link to="/admin/clientes/crear">
            </Link>
          </div>

           <div className='asistenciasclasepage-contenedor-tabla'>
             <table className='asistenciasclasepage-tabla'>
                <thead>
                    <tr>
                        <th> Dia y hora check-in </th>
                        <th> Cliente </th>
                        <th> Con Reserva </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(asistencias) && asistencias.map((a) => (
                        <tr key={a.id}>
                           <td> {formatearFecha(a.horacheckin)} </td>
                           <td> {a.cliente.nombre} {a.cliente.apellido} </td>
                           <td>
                               {conReserva(a.reservaId)}
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