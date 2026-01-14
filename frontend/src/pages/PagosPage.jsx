import '../estilos/pagosPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export function PagosPage () {

    const [busqueda, setBusqueda] = useState("") // estado para filtrar por cliente
    const [busquedaFecha, setBusquedaFecha] = useState("") // estado para filtrar por fecha
    const [busquedaMembresia, setBusquedaMembresia] = useState("") // estado para filtrar por mrembresia
   
    const urlPagos = 'http://localhost:3000/pagos';
    const { data: pagosData, loading: pagosLoading, error: pagosError } = useFetch(urlPagos, {}, { requireAuth: true });
    const pagos = pagosData?.pagos || [];

    const urlMembrecias = 'http://localhost:3000/tiposmembrecia';
    const { data: membresiasData, loading: membresiasLoading, error: membresiasError } = useFetch(urlMembrecias, {}, { requireAuth: true });
    const nombresMembresias = membresiasData?.tiposmembrecias || [];


    const agregarPago = (data) => {
      setPagos([...pagos, data])
    }

    function formatearFecha(fechaISO) {
      if (!fechaISO) return '';
  
      const fecha = new Date(fechaISO);

      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const dia = String(fecha.getDate()).padStart(2, '0');
      const hora = String(fecha.getHours()).padStart(2, '0');
      const minuto = String(fecha.getMinutes()).padStart(2, '0');

      return `${dia}-${mes}-${año} ${hora}:${minuto}`;
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
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(pagos) && pagosFiltrados.map((p) => (
                        <tr key={p.id}>
                           <td> {formatearFecha(p.fecha)} </td>
                           <td> ${p.monto} </td>
                           <td> {p.cliente.nombre} {p.cliente.apellido} </td>
                           <td> {p.tipoMembrecia.nombre}</td>                     
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
        </>
    )
}