import '../estilos/claseEspecificaPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar'
import { useFetch } from '../hooks/useFetch';

export function ClasesEspecificasPage () {
    const { id } = useParams();
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const url = `http://localhost:3000/clasesespecificas?tipoClase=${id}`;
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });

    const clases = data?.clasesEspecificas || [];
    
    function formatearFecha(fechaISO) {
      if (!fechaISO) return '';
  
      // Convertir el string ISO a objeto Date
      const fecha = new Date(fechaISO);

      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const dia = String(fecha.getDate()).padStart(2, '0');
      const hora = String(fecha.getHours()).padStart(2, '0');
      const minuto = String(fecha.getMinutes()).padStart(2, '0');

      return `${dia}-${mes}-${año} ${hora}:${minuto}`;
    }
   
   const clasesFiltradas = clases.filter(c => {
     if (estadoFiltro === "") return true;
     return c.estado === estadoFiltro;
   });


    return (
        <>
          <h1 className='clasesespecificaspage-h1'> Clases especificas  </h1>

          <div className='clasesespecificaspage-contenedor-barra-busqueda-y-boton-nuevo-claseespecifica'>
            <div className="clasesespecificaspage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por nombre o DNI' className='clasesespecificaspage-input-busqueda'></input>
            </div>

            <select
              className="clasesespecificaspage-select-estado"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente"> Pendiente </option>
              <option value="Finalizada"> Finalizada</option>
            </select>

          <Link to={`/admin/clases/${id}/crear`} className="clasesespecificaspage-boton-nuevo-claseespecifica">
            <i className="bi bi-plus"></i>
            <span className="clasesespecificaspage-texto-boton-nuevo-claseespecifica">Nueva Clase</span>
          </Link>

          <Link to={`/admin/clases/${id}/crearconpatron`} className="clasesespecificaspage-boton-nuevo-claseespecifica">
            <i className="bi bi-plus"></i>
            <span className="clasesespecificaspage-texto-boton-nuevo-claseespecifica">Nuevas clases por patrón</span>
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
                    {Array.isArray(clases) && clasesFiltradas.map((c) => (
                        <tr key={c.id}>
                           <td> {formatearFecha(c.diaHora)} </td>
                           <td>
                            <span className={`clasesespecificaspage-estado-badge estado-${c.estado}`}>
                               {c.estado}
                            </span>
                           </td>
                           <td> {c.cantmax} </td>
                           <td> {c.cantidadReservas} </td>
                           <td> {c.cantidadAsistencias}</td> 
                           <td className='clasesespecificaspage-columna-acciones'>
                              <Link to={`/admin/clases/${c.id}/reservas`}>
                                <span className='clasesespecificaspage-link-ver-reservas'> Ver reservas </span> 
                              </Link>
                              <Link to={`/admin/clases/${c.id}/asistencias`}>
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