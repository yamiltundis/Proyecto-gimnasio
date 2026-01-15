import { useEffect, useState } from "react"
import '../estilos/membreciasPage.css'
import { useFetch } from "../hooks/useFetch";

export function MembreciasPage () {

  const [membrecias, setMembrecias] = useState([])

  const url = 'http://localhost:3000/tiposMembrecia';
  const { data, loading, error } = useFetch(url, {}, { requireAuth: true });

  const memb = data?.tiposmembrecias || [];

    useEffect(() => {
    if (!data?.tiposmembrecias) return

      const fetchMembreciasConPrecio = async () => {
        const membreciasConPrecio = await Promise.all(
          data.tiposmembrecias.map(async (t) => {
            try {
              const precioResponse = await fetch(`http://localhost:3000/listasprecios/ultimo/${t.id}`)
              if (!precioResponse.ok) throw new Error('Error al traer el último precio')
              const precioData = await precioResponse.json()
              return { ...t, precio: precioData.monto }
            } catch (error) {
              return { ...t, precio: 'Desconocido' }
            }
          })
        )
        setMembrecias(membreciasConPrecio)
      }
  
      fetchMembreciasConPrecio()
    }, [data])

    return (
        <div className="membreciaspage">
           <h1> Gestión de membrecias </h1>
           <div className="membreciaspage-contenedor-tabla">
           <table className='membreciaspage-tabla'>
            <thead>
              <tr>
                <th> Membrecia </th>
                <th> Cantidad de dias </th>
                <th> Precio Actual </th>
                <th> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {
                membrecias.map((m) => (
                    <tr key={m.id}>
                       <td> {m.nombre} </td>
                       <td> {m.dias} </td>
                       <td> ${m.precio}</td>
                       <td className='membreciaspage-columna-acciones'> 
                        <i className="bi bi-highlighter"></i>
                       </td>
                    </tr>
                ))
              }
            </tbody>
           </table>
           </div>
        </div>
    )
}