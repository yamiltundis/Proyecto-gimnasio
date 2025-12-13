import { useNavigate } from "react-router-dom";
import '../estilos/botonRegresar.css'
export function BotonRegresar () {
    const navigate = useNavigate()

    return (
        <button className='boton-regresar' onClick={() => navigate(-1)}>
          ← Regresar
        </button>
    )
}