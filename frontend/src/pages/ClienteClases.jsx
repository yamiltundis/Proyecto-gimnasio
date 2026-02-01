import { useFetch } from "../hooks/useFetch";
import { TarjetaClase } from "../components/TarjetaClase";
import "../estilos/clienteClases.css"

export function ClienteClases () {

    const url = `http://localhost:3000/clasesespecificas/anotarse`;
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });
    console.log(data)

    const clasesParaAnotarse = data?.clasesEspecificas || [];

    function formatearFechaEspecial(fechaISO) {
      if (!fechaISO) return '';

      const fecha = new Date(fechaISO);
      const dias = ['domingo', 'lunes', 'martes', 'miércoles', 
        'jueves', 'viernes', 'sábado' ];
  
      const nombreDia = dias[fecha.getDay()];
  
      // Obtenemos los valores y aseguramos los 2 dígitos
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
      const hora = String(fecha.getHours()).padStart(2, '0');

      return `Este ${nombreDia} a las ${hora}:${minutos} hs`;
    }

    return (
        <>
          <h1> Aca podes anotarte a las clases! </h1>
          <h2> Recordá que las reservas pueden realizarse entre 1 y 3 dias antes de la clase </h2>
          <div className="tarjetaclase-contenedor">
          {clasesParaAnotarse.map(c => (
             <TarjetaClase
                key={c.id}
                id={c.id} 
                nombre={c.nombre}
                fechaHora={formatearFechaEspecial(c.diaHora)}
                cantMax={c.cantmax}
                reservas={c.cantidadReservas}
                yaReservado={c.yaReservado}
             />
            )
           )}
           </div>

        </>
    )
}