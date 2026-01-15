import { useState } from "react";
import '../estilos/loginPage.css';
import { setToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../context/usuarioContext";

export function LoginPage () {

    const { setUsuario } = useUsuario();

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
          const res = await fetch("http://localhost:3000/auth/login" , {
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
            navigate("/admin");
          } else if (user.rol === "cliente") {
            navigate("/cliente");
          } else {
            navigate("/login"); // fallback
          }
      } catch (err) {
           alert("Login fallido");
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
        </>
    )
}