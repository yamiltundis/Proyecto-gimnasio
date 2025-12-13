import { useParams, Link } from "react-router-dom"
import { clientes } from "../clientes"
import '../estilos/clienteEspecifico.css'
import { BotonRegresar } from "../components/BotonRegresar"

export function ClienteEspecificoPage () {
    const { id } = useParams()
    const cliente = clientes.find((c) => c.id === parseInt(id));

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