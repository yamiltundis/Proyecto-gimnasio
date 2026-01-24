import '../estilos/asistenciasPage.css'
import { useState, useEffect, use } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Calendario } from "../components/Calendario"

export function MisAsistenciasPage () {

    const url = 'http://localhost:3000/asistencias/cliente';
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });

    const asistencias = data?.asistencias || [];

    const events = asistencias.map(a => {
      const fecha = new Date(a.fechaHora);
      const hora = fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });

      return {
        title: `📍 ${hora}`,
        start: fecha,
        end: new Date(fecha.getTime() + 60 * 60 * 1000)
      };
    });

    return (
        <>
          <h1 className='asistenciaspage-h1'> Tus Asistencias </h1>
          <Calendario events={events}/>
        </>
    )
}