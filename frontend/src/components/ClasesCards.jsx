import '../estilos/clasesCards.css'

export function ClasesCards({ clases }) {
  return (
    <div className="clases-cards-container">
      {clases.map((clase) => (
        <div key={clase.id} className="clase-card">
          <h3 className="clase-card-titulo">
            {clase.nombre} - {clase.fechaHora.replace('T', ' ').slice(0,16)}
          </h3>
          <p><strong>Cupo:</strong> {clase.cupo}</p>
          <p><strong>Reservas:</strong> {clase.reservas}</p>
          <p><strong>Asistencias finales:</strong> {clase.asistenciasFinales}</p>

          <div className="clase-card-acciones">
            <button className="btn-participantes">Ver participantes</button>
            <button className="btn-reservas">Ver reservas</button>
          </div>
        </div>
      ))}
    </div>
  )
}