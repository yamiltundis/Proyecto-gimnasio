
export function TarjetaTiposClase({ nombre, fechaHora, cantMax, reservas}) {
    return (
        <>
          <h4> {nombre} {fechaHora} - {reservas}/{cantMax}</h4>
        </>
    )
}