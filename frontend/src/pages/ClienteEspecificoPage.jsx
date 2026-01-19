import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../estilos/clienteEspecifico.css';
import { BotonRegresar } from "../components/BotonRegresar";
import { useFetch } from "../hooks/useFetch";

export function ClienteEspecificoPage () {
    const { id } = useParams()

    const url = `http://localhost:3000/usuarios/${id}`;
    const { data, error, loading } = useFetch(url, {}, { requireAuth: true });
    const cliente = data?.usuario || []

    return (
        <div className='clienteespecifico'>
           <h1> {cliente.nombre} {cliente.apellido} </h1>
           <h2> {cliente.email} </h2>
           <p> {cliente.dni}</p>
            <span className={`clienteespecifico-estado-badge estado-${cliente.estado}`}>
                {cliente.estado}
            </span>
           <img src={cliente.foto} alt={`${cliente.nombre} ${cliente.apellido}`} />

           <BotonRegresar />
        </div>
    )
}