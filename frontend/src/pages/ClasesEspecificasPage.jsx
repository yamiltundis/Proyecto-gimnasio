import '../estilos/claseEspecificaPage.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BotonRegresar } from '../components/BotonRegresar'
import { useFetch } from '../hooks/useFetch';

export function ClasesEspecificasPage () {
    const { id } = useParams();

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