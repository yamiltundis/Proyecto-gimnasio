import '../estilos/pagosPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function PagosPage () {

    const [pagos, setPagos] = useState([])
    const [nombresMembresias, setNombresMembresias] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [busquedaFecha, setBusquedaFecha] = useState("")
    const [busquedaMembresia, setBusquedaMembresia] = useState("")
   
    useEffect(() => {
      const fetchPagos = async () => {
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

    useEffect(() => {
      const fetchNombresMembresias = async () => {
        try {
          const response = await fetch('http://localhost:3000/tiposmembrecia')
          if (!response.ok) {
            throw new Error('Error al traer los nombres de las membresias')
          }
          const data = await response.json();
          setNombresMembresias(data.tiposmembrecias);
        } catch (error) {
          console.error(error)
        }
      }

      fetchNombresMembresias()
    }, [])

    const agregarPago = (data) => {
      setPagos([...pagos, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return ''
      const fechaFormateada = fechaISO.replace('T', ' ').replace('Z', '')
      return fechaFormateada.slice(0, 16) // 👉 YYYY-MM-DD HH:mm
    }

    const pagosFiltrados = pagos.filter(p => {
      const coincideBusqueda = 
        p.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.cliente.apellido.toLowerCase().includes(busqueda.toLowerCase());

        let fechaAsistencia = null;
        if (p.fecha) {
          const d = new Date(p.fecha);
          if (!isNaN(d)) {
            fechaAsistencia = d.toISOString().split("T")[0];
          }
        }

        const coincideFecha =
          busquedaFecha === "" || fechaAsistencia === busquedaFecha;

        const coincideMembresia = busquedaMembresia === "" || p.tipoMembrecia.nombre === busquedaMembresia;

        return coincideBusqueda && coincideFecha && coincideMembresia
    })

    return (
        <>
          <h1 className='pagospage-h1'> Gestión de pagos </h1>

          <div className='pagospage-contenedor-barra-busqueda-y-boton-nuevo-pago'>
            <div className="pagospage-barra-busqueda-cliente">
               <i className="bi bi-search"></i>
               <input 
                  type="text" 
                  placeholder='Buscar por cliente' 
                  className='pagospage-input-busqueda'
                  value={busqueda}
                  onChange={(e) => { setBusqueda(e.target.value)}}
               />
            </div>
            <div className="pagospage-barra-busqueda-fecha">
               <i className="bi bi-search"></i>
               <input 
                  type="date" 
                  placeholder='Buscar por fecha' 
                  className='pagospage-input-busqueda'
                  value={busquedaFecha}
                  onChange={(e) => { setBusquedaFecha(e.target.value)}}
               />
            </div>
            <select
              className="pagospage-select-estado"
              value={busquedaMembresia}
              onChange={(e) => setBusquedaMembresia(e.target.value)}
            >
              <option value=""> Todas las membresias </option>
              {Array.isArray(nombresMembresias) && nombresMembresias.map((n) => {
                return <option key={n.id} value={n.nombre}> {n.nombre} </option>
              })}
            </select>

            <Link to="/admin/pagos/crear">
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
                    {Array.isArray(pagos) && pagosFiltrados.map((p) => (
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