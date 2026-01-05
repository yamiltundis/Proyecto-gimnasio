import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import '../estilos/clienteEspecifico.css'
import { BotonRegresar } from "../components/BotonRegresar"

export function ClienteEspecificoPage () {
    const { id } = useParams()
    const [cliente, setCliente] = useState([])

    useEffect(() => {
       const fetchCliente = async () => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${id}`)
            if (!response) {
                throw new Error('Error al traer la info del cliente')
            }
            const data = await response.json()
            setCliente(data.usuario)
        } catch (error) {
            console.error(error)
        }
       }

       fetchCliente()
    }, [])

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