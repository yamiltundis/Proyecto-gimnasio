import "../estilos/tarjetaClase.css"
import { useUsuario } from "../context/usuarioContext";
import { getToken } from "../helpers/auth";
import { useState } from "react";
import { ModalRespuesta } from "./ModalRespuesta";

export function TarjetaClase({ id, nombre, fechaHora, cantMax, reservas, yaReservado }) {
  const diasRestantes = cantMax - reservas;
  const { usuario } = useUsuario();
  const token = getToken();
  const [creacionExitosa, setCreacionExitosa] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false)
  const [reservaRealizada, setReservaRealizada] = useState(yaReservado)

  async function reservar() {
    try {
      const response = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          fechaReserva: new Date().toISOString(),
          clienteId: usuario.id,
          claseEspecificaId: id
        })
      });

      if (!response.ok) {
        throw new Error("Error al reservar");
      }

      const data = await response.json();
      setCreacionExitosa(true)
      setReservaRealizada(true)
      console.log("Reserva creada:", data);
    } catch (error) {
      console.error(error);
      setCreacionExitosa(false)
    } finally {
      setMostrarModal(true)
    }
  }

  return (
    <>
    <div className="tarjetaclase">
      <div className="tarjetaclase-info">
        <div className="tarjetaclase-primeracolumna">
          <h3>{nombre}</h3>
          <p>{fechaHora}</p>
          <p>Cupos restantes: {diasRestantes} de {cantMax} </p>
        </div>
        <div className="tarjetaclase-segundacolumna">
          {reservaRealizada ? <p> Ya te anotaste ✅ </p> :
          <div className="tarjetaclase-boton-reservar">
            <button
              className="clientespage-texto-boton-nuevo-cliente"
              onClick={() => reservar(id)}
            >
              Reservar
            </button>
          </div>
          }

        </div>
      </div>
    </div>
      {mostrarModal && (
        <ModalRespuesta
         frase={
            creacionExitosa
              ? "La reserva se registró correctamente!"
              : "La reserva no se pudo realizar"
         }
         exito={creacionExitosa}
          link="/cliente/clases"
          textoLink="Volver al listado de clases"
          onClose={() => setMostrarModal(false)}
       />
      )}
    </>
  );
}