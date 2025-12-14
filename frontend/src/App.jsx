import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { ClientesPage } from "./pages/ClientesPage.jsx"
import { PagosPage } from "./pages/PagosPage.jsx"
import { ClasesPage } from "./pages/ClasesPage.jsx"
import { ClienteEspecificoPage } from "./pages/ClienteEspecificoPage.jsx"
import { CrearClientePage } from "./pages/CrearClientePage"
import { MembreciasPage } from "./pages/MembreciasPage.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inicio" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="pagos" element={<PagosPage />} />
          <Route path="clases" element={<ClasesPage />} />
          <Route path="clientes/:id" element={< ClienteEspecificoPage />}/>
          <Route path="clientes/crear" element={<CrearClientePage />}/>
          <Route path="membrecias" element={<MembreciasPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
