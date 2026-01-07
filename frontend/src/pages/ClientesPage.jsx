import '../estilos/clientesPage.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function ClientesPage () {

  const [clientes, setClientes] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [estadoFiltro, setEstadoFiltro] = useState("")
  const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
      const fetchClientes = async () => {
        try {
          const response = await fetch('http://localhost:3000/usuarios')
          if (!response.ok) {
            throw new Error('Error al traer clientes')
          }
          const data = await response.json()

          // Para cada cliente, pedimos su estado
          const clientesConEstado = await Promise.all(
            data.usuarios.map(async (c) => {
              try {
                const estadoResponse = await fetch(`http://localhost:3000/membreciasActivas/${c.id}`)
                if (!estadoResponse.ok) {
                  throw new Error('Error al traer estado')
                }
                const estadoData = await estadoResponse.json()
                return { ...c, estado: estadoData.diasRestantes.estado } // combinamos cliente + estado
              } catch (error) {
                return { ...c, estado: 'Desconocido' } // fallback
              }
            })
          )

          setClientes(clientesConEstado)
        } catch (error) {
          console.error(error)
        }
      }

      fetchClientes()
    }, [])

    function confirmarEliminacion ()  {

    }

    const clientesFiltrados = clientes.filter(c => {
      const coincideBusqueda =
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.apellido.toLowerCase().includes(busqueda.toLowerCase());
    
      const coincideEstado = estadoFiltro === "" || c.estado === estadoFiltro;

      return coincideBusqueda && coincideEstado;
    })

    const eliminarCliente = (id) => {
      setClientes(clientes.filter(c => c.id !== id))
    }

    const agregarCliente = (data) => {
      setClientes([...clientes, data])
    }

    return (
        <>
          <h1 className='clientespage-h1'> Gestión de clientes </h1>

          <div className='clientespage-contenedor-barra-busqueda-y-boton-nuevo-cliente'>
            <div className="clientespage-barra-busqueda">
               <i className="bi bi-search"></i>
               <input 
                  type="text" 
                  placeholder='Buscar por nombre o apellido' 
                  className='clientespage-input-busqueda'
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  ></input>
            </div>
            <select
              className="clientespage-select-estado"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Activo"> Activo </option>
              <option value="Aplazado"> Aplazado </option>
              <option value="Suspendido"> Suspendido </option>
              <option value="Desconocido"> Desconocido </option>
            </select>

            <Link to="/admin/clientes/crear">
            <div className='clientespage-boton-nuevo-cliente'>
               <i className='bi bi-plus'></i>
               <button className='clientespage-texto-boton-nuevo-cliente'> Nuevo Cliente</button>            
            </div>
            </Link>
          </div>

           <div className='clientespage-contenedor-tabla'>
             <table className='clientespage-tabla'>
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Apellido </th>
                        <th> DNI </th>
                        <th> Email </th>
                        <th> Estado </th>
                        <th> Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(clientes) && clientesFiltrados.map((c) => (
                        <tr key={c.id}>
                           <td> {c.nombre} </td>
                           <td> {c.apellido} </td>
                           <td> {c.dni} </td>
                           <td> {c.email}</td>
                           <td>
                             <span className={`clientespage-estado-badge estado-${c.estado}`}>
                               {c.estado}
                             </span>
                           </td>
                           <td className='clientespage-columna-acciones'>
                              <Link to={`/admin/clientes/${c.id}`}>
                                <span className='clientespage-link-ver-perfil'> Ver perfil </span> 
                              </Link>
                              <i className='bi bi-trash-fill' onClick={() => setMostrarModal(true)}></i>
                           </td>                         
                        </tr>
                    ))}
                </tbody>
             </table>
           </div>
          {mostrarModal && (
            <div className="clientespage-modal-overlay">
              <div className="clientespage-modal">
                <h2>¿Seguro que querés eliminar este cliente?</h2>
                 <button onClick={confirmarEliminacion}>Sí</button>
                 <button onClick={() => setMostrarModal(false)}>Cancelar</button>
               </div>
            </div>
          )}
        </>
    )
}