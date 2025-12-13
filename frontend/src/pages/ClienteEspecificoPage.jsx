import { useParams, Link } from "react-router-dom"
import { clientes } from "../clientes"
import '../estilos/clienteEspecifico.css'

export function ClienteEspecificoPage () {
    const { id } = useParams()
    const cliente = clientes.find((c) => c.id === parseInt(id));

    return (
        <div className='clienteespecifico'>
        <Link to="/admin/clientes">
           <button> Volver a Clientes</button>
        </Link>
        <h1> {cliente.nombre} {cliente.apellido} </h1>
        <h2> {cliente.email} </h2>
        <img src={cliente.foto} alt={`${cliente.nombre} ${cliente.apellido}`} />
        </div>
    )
}