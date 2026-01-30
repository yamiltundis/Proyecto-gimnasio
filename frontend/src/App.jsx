import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioProvider, useUsuario } from "./context/usuarioContext.jsx";

// Páginas generales
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";

// Paginas para el admin
import { Layout } from "./components/Layout.jsx";
import { ClientesPage } from "./pages/ClientesPage.jsx";
import { PagosPage } from "./pages/PagosPage.jsx";
import { ClasesPage } from "./pages/ClasesPage.jsx";
import { ClienteEspecificoPage } from "./pages/ClienteEspecificoPage.jsx";
import { CrearClientePage } from "./pages/CrearClientePage";
import { MembreciasPage } from "./pages/MembreciasPage.jsx";
import { AsistenciasPage } from "./pages/AsistenciasPage.jsx";
import { CrearPagoPage } from "./pages/CrearPagoPage.jsx";
import { CrearAsistenciaPage } from "./pages/CrearAsistenciaPage.jsx";
import { ClasesEspecificasPage } from "./pages/ClasesEspecificasPage.jsx";
import { CrearClasePage } from "./pages/CrearClasePage.jsx";
import { ReservasPage } from "./pages/ReservasPage.jsx";
import { CrearClaseEspecificaPage } from "./pages/CrearClaseEspecificaPage.jsx";
import { CrearClaseEspecificaPatronPage } from "./pages/CrearClaseEspecificaPatronPage.jsx";
import { CrearPrimerPagoPage } from "./pages/CrearPrimerPagoPage.jsx";
import { LoginLayout } from "./components/LoginLayout.jsx";
import { AsistenciasClasePage } from "./pages/AsistenciasClasePage.jsx";

// Páginas para el cliente
import { LayoutCliente } from "./components/LayoutCliente.jsx";
import { MiPerfil } from "./pages/MiPerfilPage.jsx";
import { MisAsistenciasPage } from "./pages/MisAsistenciasPage.jsx";
import { MisPagosPage } from "./pages/MisPagosPage.jsx";
import { ClienteClases } from "./pages/ClienteClases.jsx";

function App() {

  return (
    <UsuarioProvider>
     <BrowserRouter>
       <Routes>
        <Route path="/inicio" element={<HomePage />} />

        <Route path ="/login"element={<LoginLayout />}>
          <Route path="" element={<LoginPage />} />
        </Route>

        <Route path="/admin" element={<Layout />}>
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="clientes/:id" element={< ClienteEspecificoPage />}/>
          <Route path="clientes/crear" element={<CrearClientePage />}/>
          <Route path="pagos" element={<PagosPage />} />
          <Route path="pagos/crear" element={<CrearPagoPage />} />
          <Route path="pagos/crearprimerpago" element={<CrearPrimerPagoPage />} />
          <Route path="clases" element={<ClasesPage />} />
          <Route path="clases/:id" element={ <ClasesEspecificasPage/>}/>
          <Route path="clases/:id/crear" element={ <CrearClaseEspecificaPage/>}/>
          <Route path="clases/:id/crearconpatron" element={ <CrearClaseEspecificaPatronPage/>}/>
          <Route path="clases/:id/reservas" element={<ReservasPage />}/>
          <Route path="clases/:id/asistencias" element={<AsistenciasClasePage />}/>
          <Route path="clases/crear" element={ <CrearClasePage/>}/>
          <Route path="membrecias" element={<MembreciasPage />}/>
          <Route path="asistencias" element={<AsistenciasPage />}/>
          <Route path="asistencias/crear" element={<CrearAsistenciaPage />}/>
        </Route>

        <Route path="/cliente" element={<LayoutCliente />}>
          <Route path="miperfil" element={<MiPerfil />}></Route>
          <Route path="misasistencias" element={<MisAsistenciasPage />}></Route>
          <Route path="mispagos" element={<MisPagosPage />}></Route>
          <Route path="clases" element={<ClienteClases />}></Route>
        </Route>
       </Routes>

     </BrowserRouter>
    </UsuarioProvider>
  )
}

export default App
