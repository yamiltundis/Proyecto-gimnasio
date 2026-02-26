export function ModificarPrecios({ precioBase, setPrecioBase }) {
    const [cargando, setCargando] = useState(false);

    const CONFIG_DESCUENTOS = [
        { nombre: "Mensual", meses: 1, desc: 0 },
        { nombre: "Bimestral", meses: 2, desc: 0.07 },
        { nombre: "Trimestral", meses: 3, desc: 0.12 },
        { nombre: "Semestral", meses: 6, desc: 0.18 },
        { nombre: "Anual", meses: 12, desc: 0.25 }
    ];

    const proyeccion = CONFIG_DESCUENTOS.map(plan => {
        const subtotal = Number(precioBase) * plan.meses;
        const total = Math.round(subtotal * (1 - plan.desc));
        return { ...plan, totalSugerido: total };
    });

    // Función para cerrar y resetear
    const handleCerrar = () => {
        setPrecioBase(""); // Al volver a ser "" (o 0), desaparece el componente en el padre
    };

    const handleActualizarTodo = async () => {
        setCargando(true);
        try {
            const token = getToken();
            const response = await fetch('http://localhost:3000/tiposMembrecia/actualizar-precios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    precioBase: Number(precioBase),
                    proyeccion 
                })
            });

            if (!response.ok) throw new Error("Error en la actualización masiva");
            
            alert("¡Precios actualizados con éxito!");
            handleCerrar(); // Cerramos el componente
            window.location.reload(); 
        } catch (err) {
            alert("Hubo un error al cargar los precios.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="modificarprecios-contenedor-modificaciones">
            <div className="modificarprecios-modal-respuesta-overlay">
                <div className="modificarprecios-modal-respuesta-contenido">
                    <h3>Confirmar Nuevos Precios</h3>
                    <p>Basado en un precio mensual de <strong>${precioBase}</strong>:</p>
                    
                   <table className="modificarprecios-tabla">
                       <thead>
                           <tr>
                               <th>Plan</th>
                               <th>Nuevo Precio</th>
                               <th>Descuento aplicado</th>
                           </tr>
                       </thead>
                       <tbody>
                           {proyeccion.map(p => (
                               <tr key={p.nombre}>
                                   <td>{p.nombre}</td>
                                   <td><strong>${p.totalSugerido.toLocaleString()}</strong></td>
                                   <td>{p.desc * 100}%</td>
                               </tr>
                           ))}
                       </tbody>
                   </table>

                    <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
                        <button onClick={handleCerrar} type="button">Cancelar</button>
                        <button 
                            className="modificarprecios-boton-submit" 
                            onClick={handleActualizarTodo}
                            disabled={cargando}
                        >
                            {cargando ? "Cargando..." : "Cargar nuevos precios"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}