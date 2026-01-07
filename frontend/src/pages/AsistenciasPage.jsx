import '../estilos/asistenciasPage.css'
import { useState, useEffect, use } from 'react'
import { Link } from 'react-router-dom'

export function AsistenciasPage () {

    const [asistencias, setAsistencias] = useState([])
    const [busquedaFecha, setBusquedaFecha] = useState("")
    const [busqueda, setBusqueda] = useState("")
   
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

      const asistenciasFiltradas = asistencias.filter(a => {
        const coincideBusqueda =
          a.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          a.cliente.apellido.toLowerCase().includes(busqueda.toLowerCase());

  
        let fechaAsistencia = null;
        if (a.fechaHora) {
          const d = new Date(a.fechaHora);
          if (!isNaN(d)) {
            fechaAsistencia = d.toISOString().split("T")[0];
          }
        }

        const coincideFecha =
          busquedaFecha === "" || fechaAsistencia === busquedaFecha;
    
        return coincideBusqueda && coincideFecha;
      });



    return (
        <>
          <h1 className='asistenciaspage-h1'> Gestión de Asistencias </h1>

          <div className='asistenciaspage-contenedor-barra-busqueda-y-boton-nuevo-asistencia'>
            <div className="asistenciaspage-barra-busqueda-cliente">
               <i className="bi bi-search"></i>
               <input 
                  type="text" 
                  placeholder='Buscar por cliente' 
                  className='asistenciaspage-input-busqueda'
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
               />
            </div>
            <div className="asistenciaspage-barra-busqueda-dia">
               <input 
                  type="date"
                  placeholder='Busque asistencia por dia'
                  className='asistenciaspage-input-busqueda'
                  value={busquedaFecha}
                  onChange={(e) => { setBusquedaFecha(e.target.value)}}
               />
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
                    {Array.isArray(asistencias) && asistenciasFiltradas.map((a) => (
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