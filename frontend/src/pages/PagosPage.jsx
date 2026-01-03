import '../estilos/pagosPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function PagosPage () {

    const [pagos, setPagos] = useState([])
   
    useEffect(() => {
      const fetchPagos= async () => {
        try {
          const response = await fetch('http://localhost:3000/pagos')
          if (!response.ok) {
            throw new Error('Error al traer pagos')
          }
          const data = await response.json()

          setPagos(data.pagos)
        } catch (error) {
          console.error(error)
        }
      }

      fetchPagos()
    }, [])

    const agregarPago = (data) => {
      setPagos([...pagos, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const fechaFormateada = fechaISO.replace('T', ' ').replace('Z', '')
      return fechaFormateada.slice(0, 16) // 👉 YYYY-MM-DD HH:mm
    }


    return (
        <>
          <h1 className='pagospage-h1'> Gestión de pagos </h1>

          <div className='pagospage-contenedor-barra-busqueda-y-boton-nuevo-pago'>
            <div className="pagospage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por cliente' className='pagospage-input-busqueda'></input>
            </div>
            <Link to="/admin/clientes/crear">
            <div className='pagospage-boton-nuevo-pago'>
               <i className='bi bi-plus'></i>
               <button className='pagospage-texto-boton-nuevo-pago'> Nuevo Pago</button>            
            </div>
            </Link>
          </div>

           <div className='pagospage-contenedor-tabla'>
             <table className='pagospage-tabla'>
                <thead>
                    <tr>
                        <th> Fecha </th>
                        <th> Monto </th>
                        <th> Cliente </th>
                        <th> Membrecia </th>
                        <th> Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(pagos) && pagos.map((p) => (
                        <tr key={p.id}>
                           <td> {formatearFecha(p.fecha)} </td>
                           <td> ${p.monto} </td>
                           <td> {p.cliente.nombre} {p.cliente.apellido} </td>
                           <td> {p.tipoMembrecia.nombre}</td>
                           <td className='pagospage-columna-acciones'>
                              <Link to={`/admin/clientes/${p.id}`}>
                                <button className='pagospage-boton-ver-info'> Ver info </button> 
                              </Link>
                           </td>                         
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
        </>
    )
}