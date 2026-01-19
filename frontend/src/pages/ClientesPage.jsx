import '../estilos/clientesPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export function ClientesPage () {
  const [busqueda, setBusqueda] = useState("")
  const [estadoFiltro, setEstadoFiltro] = useState("")
  const [mostrarModal, setMostrarModal] = useState(false)

  const url = 'http://localhost:3000/usuarios'
  const { data, loading, error } = useFetch(url, {}, true) // requireAuth = true

  const clientes = data?.usuarios || [];

  function confirmarEliminacion () {
    // lógica de eliminación
  }

  const clientesFiltrados = clientes.filter(c => {
    const coincideBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.apellido.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado = estadoFiltro === "" || c.estado === estadoFiltro

    return coincideBusqueda && coincideEstado
  })

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <h1 className='clientespage-h1'>Gestión de clientes</h1>

          <div className='clientespage-contenedor-barra-busqueda-y-boton-nuevo-cliente'>
            <div className="clientespage-barra-busqueda">
              <i className="bi bi-search"></i>
              <input 
                type="text" 
                placeholder='Buscar por nombre o apellido' 
                className='clientespage-input-busqueda'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <select
              className="clientespage-select-estado"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Aplazado">Aplazado</option>
              <option value="Suspendido">Suspendido</option>
              <option value="Desconocido">Desconocido</option>
            </select>

            <Link to="/admin/clientes/crear">
              <div className='clientespage-boton-nuevo-cliente'>
                <i className='bi bi-plus'></i>
                <button className='clientespage-texto-boton-nuevo-cliente'>Nuevo Cliente</button>            
              </div>
            </Link>
          </div>

          <div className='clientespage-contenedor-tabla'>
            <table className='clientespage-tabla'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Dias Restantes</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(clientes) && clientesFiltrados.map((c) => (
                  <tr key={c.id}>
                    <td>{c.nombre}</td>
                    <td>{c.apellido}</td>
                    <td>{c.dni}</td>
                    <td>{c.email}</td>
                    <td>
                      <span className={`clientespage-estado-badge estado-${c.membresia.estado}`}>
                        {c.membresia.estado}
                      </span>
                    </td>
                    <td> {c.membresia.diasRestantes}</td>
                    <td className='clientespage-columna-acciones'>
                      <Link to={`/admin/clientes/${c.id}`}>
                        <span className='clientespage-link-ver-perfil'>Ver perfil</span> 
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
      )}
    </>
  )
}