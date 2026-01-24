import '../estilos/asistenciasPage.css'
import { useState, useEffect, use } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Calendario } from "../components/Calendario"

export function MisAsistenciasPage () {

    const [busquedaFecha, setBusquedaFecha] = useState("")
    const [busqueda, setBusqueda] = useState("")

    const url = 'http://localhost:3000/asistencias/cliente';
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });

    const asistencias = data?.asistencias || [];

    const events = asistencias.map(a => {
      const fecha = new Date(a.fechaHora);
      const hora = fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });

      return {
        title: `📍 ${hora}`,   // 👈 ahora se ve la hora
        start: fecha,
        end: new Date(fecha.getTime() + 60 * 60 * 1000)
      };
    });


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

      const asistenciasFiltradas = asistencias.filter(a => {

        let fechaAsistencia = null;
        if (a.fechaHora) {
          const d = new Date(a.fechaHora);
          if (!isNaN(d)) {
            fechaAsistencia = d.toISOString().split("T")[0];
          }
        }

        const coincideFecha =
          busquedaFecha === "" || fechaAsistencia === busquedaFecha;
    
        return coincideFecha;
      });



    return (
        <>
          <h1 className='asistenciaspage-h1'> Tus Asistencias </h1>
           <div className='asistenciaspage-contenedor-tabla'>
             <table className='asistenciaspage-tabla'>
                <thead>
                    <tr>
                        <th> Fecha y Hora </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(asistencias) && asistenciasFiltradas.map((a) => (
                        <tr key={a.id}>
                           <td> {formatearFecha(a.fechaHora)} </td>                       
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
           <Calendario events={events}/>

        </>
    )
}