import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { CabeceraCalendario } from "./CabeceraCalendario";
import '../estilos/calendario.css'
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { es };

const localizer = dateFnsLocalizer({
  format: (date, formatStr, options) => format(date, formatStr, { ...options, locale: es }),
  parse,
  startOfWeek,
  getDay,
  locales,
});

export function Calendario({ events }) {
  const [vistaActual, setVistaActual] = useState("month");
  const [fechaActual, setFechaActual] = useState(new Date());

  return (
    <div style={{ height: "calc(100vh - 200px)" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        view={vistaActual}
        onView={(vista) => setVistaActual(vista)}
        date={fechaActual}
        onNavigate={(nuevaFecha) => setFechaActual(nuevaFecha)}
        defaultView="month"
        style={{ height: "100%" }}
        min={new Date(2026, 0, 1, 8, 0)}
        max={new Date(2026, 0, 1, 21, 0)}
        components={{ toolbar:  CabeceraCalendario}}
      />
    </div>
  );
}
