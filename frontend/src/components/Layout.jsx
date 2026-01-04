import { Outlet, Link } from 'react-router-dom'
import "../estilos/layout.css"
import "bootstrap-icons/font/bootstrap-icons.css";

export function Layout () {
    return (
        <div className='layout'>
            <header className='layout-header'>
                <h1> TuGym </h1>
            </header>
            <aside className='layout-aside'>
                <ul className='layout-aside-lista'>
                    <Link to="/admin/clientes">
                      <li className='bi bi-person-lines-fill'> Clientes </li>
                    </Link>

                    <Link to="/admin/asistencias">
                      <li className='bi bi-file-arrow-down'> Asistencias </li>
                    </Link>

                    <Link to="/admin/pagos">
                      <li className='bi bi-cash'> Pagos </li>
                    </Link>

                    <Link to="/admin/clases">
                      <li className='bi bi-stack'> Clases </li>
                    </Link>

                    <Link to="/admin/membrecias">
                      <li className='bi bi-card-checklist'> Membrecias </li>
                    </Link>
                </ul>
            </aside>
            <main className='layout-main'>
                <Outlet />
            </main>
            <footer className='layout-footer'>
                <p> TuGym 2025</p>
            </footer> 
        </div>
    )
}