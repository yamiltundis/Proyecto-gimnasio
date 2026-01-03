import { useEffect, useState } from "react"
import '../estilos/membreciasPage.css'

export function MembreciasPage () {

  const [membrecias, setMembrecias] = useState([])

   useEffect(() => {
     const fetchMembrecias = async () => {
      try {
        const response = await fetch('http://localhost:3000/tiposMembrecia')
        if (!response.ok) {
          throw new Error('Error al traer los tipos de membrecia')
        }
        const data = await response.json()

        const membreciasConPrecio = await Promise.all(
            data.tiposmembrecias.map(async (t) => {
              try {
                const precioResponse = await fetch(`http://localhost:3000/listasprecios/ultimo/${t.id}`)
                if (!precioResponse.ok) {
                  throw new Error('Error al traer precio')
                }
                const precioData = await precioResponse.json()
                return { ...t, precio: precioData.monto } // combinamos membrecia + precio
              } catch (error) {
                console.error(`Error al traer precio de membrecia ${t.id}:`, error)
                return { ...t, precio: 'Desconocido' } // fallback
              }
            })
        )

        setMembrecias(membreciasConPrecio)
      } catch (error) {
        console.error(error)
      }
     }

     fetchMembrecias()
   }, [])


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