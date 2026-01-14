import '../estilos/clasesPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

export function ClasesPage () {

    const url = 'http://localhost:3000/tiposclase';
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });

    const clases = data?.tiposClase || [];

    const eliminarClase = (id) => {
      setClases(clases.filter(c => c.id !== id))
    }

    const agregarClase = (data) => {
      setClases([...clases, data])
    }

    return (
        <>
          <h1 className='clasespage-h1'> Gestión de clases </h1>

          <div className='clasespage-contenedor-barra-busqueda-y-boton-nuevo-clase'>
            <div className="clasespage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input type="text" placeholder='Buscar por nombre' className='clasespage-input-busqueda'></input>
            </div>
            <Link to="/admin/clases/crear">
            <div className='clasespage-boton-nuevo-clase'>
               <i className='bi bi-plus'></i>
               <button className='clasespage-texto-boton-nuevo-clase'> Nuevo tipo de clase </button>            
            </div>
            </Link>
          </div>

           <div className='clasespage-contenedor-tabla'>
             <table className='clasespage-tabla'>
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(clases) && clases.map((c) => (
                        <tr key={c.id}>
                           <td> {c.nombre} </td>
                           <td className='clasespage-columna-acciones'>
                              <Link to={`/admin/clases/${c.id}`}>
                                <p className='clasespage-link-ver-clases'> Ver clases </p> 
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