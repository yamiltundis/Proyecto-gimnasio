import { Outlet, Link } from 'react-router-dom'
import "../estilos/loginLayout.css"
import "bootstrap-icons/font/bootstrap-icons.css";

export function LoginLayout () {
    return (
        <div className='loginlayout'>
            <header className='loginlayout-header'>
                <h1> GymLab </h1>
            </header>
            <main className='loginlayout-main'>
                <Outlet />
            </main>
            <footer className='loginlayout-footer'>
                <p> GymLab 2026 </p>
            </footer> 
        </div>
    )
}