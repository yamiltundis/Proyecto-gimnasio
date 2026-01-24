

export function CabeceraCalendario({ label, onNavigate, onView }) {
  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button onClick={() => onNavigate("PREV")}>Atrás</button>
        <button onClick={() => onNavigate("NEXT")}>Siguiente</button>
      </div>
      <div className="rbc-toolbar-label">{label}</div>
    </div>
  );
}
