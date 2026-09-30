import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import { MascotProvider } from "./context/MascotContext";

import MainLayout from "./layouts/MainLayout";
import AsistenteVirtual from "./componentes/AsistenteVirtual/AsistenteVirtual";
import "./App.css";

// --- COMPONENTE DE CONTROL DE SCROLL ---
import ScrollToTop from "./componentes/ScrollToTop";

const Inicio = lazy(() => import("./paginas/Index"));
const CursoCapacitacion = lazy(() => import("./paginas/CursoCapacitacion"));
const CuestionarioCurso = lazy(() => import("./paginas/CuestionarioCurso"));
const Nosotros = lazy(() => import("./paginas/Nosotros"));
const CentrodeAyuda = lazy(() => import("./paginas/CentrodeAyuda"));
const Unete = lazy(() => import("./paginas/Unete"));
const Perfil = lazy(() => import("./paginas/Perfil"));
const LibroDeReclamaciones = lazy(
  () => import("./paginas/LibroDeReclamaciones"),
);
const Login = lazy(() => import("./componentes/Login"));
const VerDetalles = lazy(() => import("./componentes/VerDetalles"));
const FormularioDePostulacion = lazy(
  () => import("./paginas/FormularioDePostulacion"),
);

function App() {
  return (
    <MascotProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
          <Routes>
            {/* MainLayout envuelve a todas las rutas que llevan NavBar y Footer */}

            <Route path="/" element={<Login />} />

            {/* Página de inicio normal con el menú y footer, a la que entrarán tras loguearse */}
            <Route
              path="/inicio"
              element={
                <MainLayout>
                  <Inicio />
                </MainLayout>
              }
            />
            <Route
              path="/capacitacion/:cursoId"
              element={
                <MainLayout>
                  <CursoCapacitacion />
                </MainLayout>
              }
            />
            <Route
              path="/capacitacion/:cursoId/cuestionario"
              element={
                <MainLayout>
                  <CuestionarioCurso />
                </MainLayout>
              }
            />
            <Route
              path="/nosotros"
              element={
                <MainLayout>
                  <Nosotros />
                </MainLayout>
              }
            />
            <Route
              path="/centrodeayuda"
              element={
                <MainLayout>
                  <CentrodeAyuda />
                </MainLayout>
              }
            />
            <Route
              path="/unete"
              element={
                <MainLayout>
                  <Unete />
                </MainLayout>
              }
            />
            <Route
              path="/perfil/:username"
              element={
                <MainLayout>
                  <Perfil />
                </MainLayout>
              }
            />
            <Route
              path="/libro-de-reclamaciones"
              element={
                <MainLayout>
                  <LibroDeReclamaciones />
                </MainLayout>
              }
            />
            <Route
              path="/detalles-empleo/:id"
              element={
                <MainLayout>
                  <VerDetalles />
                </MainLayout>
              }
            />
            <Route
              path="/postular/:id"
              element={
                <MainLayout>
                  <FormularioDePostulacion />
                </MainLayout>
              }
            />
          </Routes>

          <AsistenteVirtual />
        </Suspense>
      </BrowserRouter>
    </MascotProvider>
  );
}

export default App;
