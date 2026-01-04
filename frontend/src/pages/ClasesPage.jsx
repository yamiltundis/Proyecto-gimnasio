import { ClasesCards } from "../components/clasesCards"
export function ClasesPage () {
    return (
        <>
          <h1> Las clases </h1>

          <ClasesCards
            clases={[
              {
                id: 1,
                nombre: "Boxeo",
                fechaHora: "2026-01-08T19:00",
                cupo: 30,
                reservas: 18,
                asistenciasFinales: 25
              },
              {
                id: 2,
                nombre: "Zumba",
                fechaHora: "2026-01-10T20:00",
                cupo: 25,
                reservas: 20,
                asistenciasFinales: 22
              }
            ]}
          />

        </>
    )
}