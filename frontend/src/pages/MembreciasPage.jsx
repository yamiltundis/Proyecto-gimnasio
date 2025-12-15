import { membrecias } from "../membrecias"
import '../estilos/membreciasPage.css'

export function MembreciasPage () {
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
                       <td> {m.cantidadDias} </td>
                       <td> ${m.precioActual}</td>
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