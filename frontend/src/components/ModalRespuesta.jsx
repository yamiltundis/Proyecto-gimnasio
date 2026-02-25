import { Link } from "react-router-dom";
import '../estilos/modalRespuesta.css';

export function ModalRespuesta ({ frase, exito, link = null, textoLink, onClose }) {
    return (
        <>
            <div className="modal-overlay">
              <div className="modal-windows">
                <h2>
                  {frase}
                </h2>
                {exito ? (
                  <i className="bi bi-check-circle-fill icono-exito"></i>
                ) : (
                  <i className="bi bi-x-circle-fill icono-error"></i>
                )}
                {
                  link ? (
                    <Link to={link}>
                       <span onClick={onClose} className="link-cerrar-modal"> {textoLink}</span>
                    </Link>
                  ) : (
                    <span onClick={onClose} className="link-cerrar-modal"> {textoLink}</span>
                  )
                }
           </div>
         </div>
        </>
    )
}