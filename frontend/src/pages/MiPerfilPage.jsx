import { useUsuario } from "../context/usuarioContext";

export function MiPerfil () {

    const { usuario } = useUsuario();

    if (!usuario) {
      return <p>Cargando perfil...</p>;
    }

    return (
        <>
           <h1> Hola {usuario.nombre}, este es mi perfil! </h1>  
        </>
    )
}