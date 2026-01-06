import '../estilos/reservasPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

export function ReservasPage () {
    const { id } = useParams(); 
    const [reservas, setReservas] = useState([])
   
    useEffect(() => {
      const fetchReservas = async () => {
        try {
          const response = await fetch(`http://localhost:3000/reservas?claseEspecificaId=${id}`)
          if (!response.ok) {
            throw new Error('Error al traer reservas')
          }
          const data = await response.json()

          setReservas(data.reservas)
        } catch (error) {
          console.error(error)
        }
      }

      fetchReservas()
    }, [])



    const eliminarReserva = (id) => {
      setReservas(reservas.filter(r => r.id !== id))
    }

    const agregarReserva = (data) => {
      setReservas([...reservas, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const fechaFormateada = fechaISO.replace('T', ' ').replace('Z', '')
      return fechaFormateada.slice(0, 16) // 👉 YYYY-MM-DD HH:mm
    }


    return (
        <>
          <h1 className='reservaspage-h1'> Reservas </h1>

          <div className='reservaspage-contenedor-barra-busqueda-y-boton-nuevo-reserva'>
            <div className="reservaspage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por nombre o DNI' className='reservaspage-input-busqueda'></input>
            </div>
            <Link to="/admin/clientes/crear">
            </Link>
          </div>

           <div className='reservaspage-contenedor-tabla'>
             <table className='reservaspage-tabla'>
                <thead>
                    <tr>
                        <th> Fecha y hora </th>
                        <th> Cliente</th>
                        <th> Estado </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(reservas) && reservas.map((r) => (
                        <tr key={r.id}>
                           <td> {formatearFecha(r.fechaReserva)} </td>
                           <td> {r.cliente.nombre} {r.cliente.apellido} </td>
                           <td>
                            {/*<span className={`clasesespecificaspage-estado-badge estado-${c.estado}`}> */}
                               {r.estado}
                            {/*</span> */}
                           </td>                 
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
        </>
    )
}