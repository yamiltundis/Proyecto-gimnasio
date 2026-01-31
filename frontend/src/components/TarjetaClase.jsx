import "../estilos/tarjetaClase.css"

export function TarjetaClase({ nombre, fechaHora, cantMax, reservas}) {

   const diasRestantes = cantMax - reservas;

    return (
        <div className="tarjetaclase">
         <div className="tarjetaclase-info">
          <div className="tarjetaclase-primeracolumna">
            <h3> {nombre} </h3> 
            <p> {fechaHora} </p>
            <p> Cupos restantes: {diasRestantes} </p>
            <p> Capacidad máxima: {cantMax} </p>
          </div>
          <div className="tarjetaclase-segundacolumna">
            <div className='tarjetaclase-boton-reservar'>
              <button className='clientespage-texto-boton-nuevo-cliente'> Reservar </button>            
            </div>
          </div>
         </div>
        </div>
    )
}