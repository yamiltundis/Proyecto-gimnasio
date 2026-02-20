import '../estilos/membreciaEspecificaPage.css'
import { useParams } from "react-router-dom"
import { BotonRegresar } from "../components/BotonRegresar"
import { useFetch } from "../hooks/useFetch";

export function MembreciaEspecificaPage () {
    const { id } = useParams();
    const url = `http://localhost:3000/listasprecios?tipoMembreciaId=${id}`;
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });
    
    const listado = data?.listasprecios || [];
    const nombre = listado.length > 0 ? listado[0].tipoMembrecia.nombre : "Membresía";

    function formatearFecha(fechaISO) {
      if (!fechaISO) return '';
  
      const fecha = new Date(fechaISO);

      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const dia = String(fecha.getDate()).padStart(2, '0');
      const hora = String(fecha.getHours()).padStart(2, '0');
      const minuto = String(fecha.getMinutes()).padStart(2, '0');

      return `${dia}-${mes}-${año} ${hora}:${minuto}`;
    }

    if (loading) return <div className="contenedor"><h1>Cargando...</h1></div>;
    if (error) return <div className="contenedor"><h1>Error en la conexión</h1></div>;

    return (
        <>
          <h1> Membresía: {nombre.toLowerCase()} </h1>
          <div className="membreciaespecificapage-contenedor-tabla">
            {listado.length > 0 ? (
               <table className='membreciaespecificapage-tabla'>
                    <thead>
                      <tr>
                        <th> Fecha Inicio </th>
                        <th> Precio </th>
                        <th> Acciones </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        listado.map((l) => (
                            <tr key={l.id}>
                               <td> {formatearFecha(l.diaInicial)} </td>
                               <td> ${l.monto}</td>
                               <td className='membreciaepecificapage-columna-acciones'>
                               </td>
                            </tr>
                        ))
                      }
                    </tbody>
               </table>
            ) : (
               <p>No hay precios registrados para esta membresía.</p>
            )}
          </div>
          <BotonRegresar />
        </>
    )
}