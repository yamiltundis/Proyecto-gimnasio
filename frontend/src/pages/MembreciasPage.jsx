import { use, useEffect, useState } from "react"
import '../estilos/membreciasPage.css'
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { ModificarPrecios } from "../components/ModificarPrecios";

export function MembreciasPage () {

  const [membrecias, setMembrecias] = useState([])
  const [precioBase, setPrecioBase] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const url = `${API_URL}/tiposMembrecia`;
  const { data, loading, error } = useFetch(url, {}, { requireAuth: true });

  const memb = data?.tiposmembrecias || [];

  const handleChange = (e) => {

  };

  const handleSubmit = () => {

  };

  const options = membrecias.map(m => ({
    value: m.id,
    label: `${m.nombre}`
  }));

    useEffect(() => {
    if (!data?.tiposmembrecias) return

      const fetchMembreciasConPrecio = async () => {
        const membreciasConPrecio = await Promise.all(
          data.tiposmembrecias.map(async (t) => {
            try {
              const precioResponse = await fetch(`${API_URL}/listasprecios/ultimo/${t.id}`)
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
      <>
        <h1> Gestion de membresias</h1>
        <div className="membreciaspage">

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
                          <Link to={`/admin/membrecias/${m.id}`}>
                            <span className='membreciaspage-link-ver-mas'> Ver más </span> 
                          </Link>
                        </td>
                      </tr>
                  ))
                }
              </tbody>
             </table>
            </div>

           <div className="membreciaspage-contenedor-modificaciones">
            <h2> Modificar precios en base a un nuevo precio mensual</h2>
            <form className="membreciaspage-formulario" onSubmit={handleSubmit}>
            <div className="membreciaspage-contenedor-inputs">
                <label>
                  Precio mensual
                  <input
                    type="number"
                    value={precioBase}
                    placeholder="Ingrese el nuevo precio"
                    required
                  />
                </label>          
            </div>
              <button type="submit" className="membreciaspage-boton-submit">
                Continuar
              </button>
            </form>
            </div>
            {precioBase > 0 && (
              <ModificarPrecios 
                precioBase={precioBase} 
                setPrecioBase={setPrecioBase} // Se la pasamos para que pueda limpiar el input al terminar
              />
            )}
        </div>
      </>
    )
}