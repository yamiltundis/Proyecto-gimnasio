import "../estilos/tarjetaPago.css"

export function TarjetaPago({id, fecha, membresia, monto}) {
    return (
        <div className="tarjetapago">
            <div className="tarjetapago-info">
                <div className="tarjetapago-primeracolumna">
                  <h2> Pago #{id} </h2>
                  <p> Fecha: {fecha} </p>
                  <p> {membresia}</p>
                </div>
                <div className="tarjetapago-segundacolumna">
                  <span> ${monto} </span>
                </div>
            </div>
        </div>
    )
}