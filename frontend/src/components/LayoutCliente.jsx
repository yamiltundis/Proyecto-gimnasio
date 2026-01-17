import { Outlet, Link } from 'react-router-dom'
import "../estilos/layout.css"
import "bootstrap-icons/font/bootstrap-icons.css";

export function LayoutCliente () {
    return (
        <div className='layout'>
            <header className='layout-header'>
                <h1> GymLab </h1>
            </header>
            <aside className='layout-aside'>
                <ul className='layout-aside-lista'>
                    <Link to="/cliente/miperfil">
                      <li className='bi bi-person-lines-fill'> Mi perfil </li>
                    </Link>

                    <Link to="/cliente/misasistencias">
                      <li className='bi bi-file-arrow-down'> Asistencias </li>
                    </Link>

                    <Link to="/cliente/mispagos">
                      <li className='bi bi-cash'> Pagos </li>
                    </Link>

                    <Link to="/admin/clases">
                      <li className='bi bi-stack'> Clases </li>
                    </Link>
                </ul>
            </aside>
            <main className='layout-main'>
                <Outlet />
            </main>
            <footer className='layout-footer'>
                <p> GymLab 2026 </p>
            </footer> 
        </div>
    )
}