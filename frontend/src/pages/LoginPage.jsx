import { useState } from "react";
import '../estilos/loginPage.css';
import { setToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/usuarioContext";
import { ModalRespuesta } from "../components/ModalRespuesta"

export function LoginPage () {

    const { setUsuario } = useUsuario();
    const [modalRechazo, setModalRechazo] = useState(null)

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
      
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData({
       ...formData,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const API_URL = import.meta.env.VITE_API_URL;
          const res = await fetch(`${API_URL}/auth/login` , {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData)
          });
          if (!res.ok) throw new Error("Error en login");
          const json = await res.json();
          console.log("Respuesta del backend:", json);

          const { user, token } = json.data;

          setToken(token);
          setUsuario(user);
            
          if (user.rol === "admin" || user.rol === "superadmin") {
            navigate("/admin/clientes");
          } else if (user.rol === "cliente") {
            navigate("/cliente/miperfil");
          } else {
            navigate("/login");
          }
      } catch (err) {
          setModalRechazo(true)

      }
      console.log('Datos del inicio de sesión:', formData);
    };

    return (
        <>
            <h1 className="loginpage-h1"> Inicio de sesión </h1>
            <form className="loginpage-formulario" onSubmit={handleSubmit}>
              <div className="loginpage-contenedor-inputs">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    placeholder="Ingrese su email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Contraseña
                  <input
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <button type="submit" className="loginpage-boton-submit">
                Iniciar sesión
              </button>
            </form>
            {modalRechazo && (
              <ModalRespuesta
                frase="Login incorrecto"
                exito={false}
                textoLink="Volver"
                onClose={() => setModalRechazo(false)}
             />
            )}
        </>
    )
}