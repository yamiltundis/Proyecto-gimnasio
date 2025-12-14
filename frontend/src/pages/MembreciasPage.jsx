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
                <td> Membrecia </td>
                <td> Cantidad de dias </td>
                <td> Acciones </td>
              </tr>
            </thead>
            <tbody>
              {
                membrecias.map((m) => (
                    <tr key={m.id}>
                       <td> {m.nombre} </td>
                       <td> {m.cantidadDias} </td>
                       <td className='membreciaspage-columna-acciones'> </td>
                    </tr>
                ))
              }
            </tbody>
           </table>
           </div>
        </div>
    )
}