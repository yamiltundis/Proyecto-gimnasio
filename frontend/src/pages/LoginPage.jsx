import { useState } from "react";
import '../estilos/loginPage.css'

export function LoginPage () {

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
                    name="fecha"
                    placeholder="Ingrese su email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Contraseña
                  <input
                    type="text"
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