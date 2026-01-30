import { useFetch } from "../hooks/useFetch";
import { TarjetaTiposClase } from "../components/TarjetaTiposClase";

export function ClienteClases () {

    const url = `http://localhost:3000/clasesespecificas/anotarse`;
    const { data, loading, error } = useFetch(url, {}, { requireAuth: true });
    console.log(data)

    const clasesParaAnotarse = data?.clasesEspecificas || [];

    return (
        <>
          <h1> Aca podes anotarte a las clases! </h1>
          <h2> Recordá que las reservas pueden realizarse entre 1 y 3 dias antes de la clase </h2>
          {clasesParaAnotarse.map((c) => {
            return (
             <TarjetaTiposClase
                key={c.id} // 👈 siempre poné key en listas
                nombre={c.nombre}
                fechaHora={c.diaHora}
                cantMax={c.cantmax} // ojo: en el objeto es "cantmax", no "cantMax"
                reservas={c.cantidadReservas}
             />
            )
           })}

        </>
    )
}