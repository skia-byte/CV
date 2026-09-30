import NavBar from "../componentes/NavBar";
import Footer from "../componentes/Footer";
import { Toaster } from "react-hot-toast"; // 1. Importar Toaster

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f2f5f0] text-[#18261d]">
      <NavBar />
      <main className="grow">{children}</main>
      <Footer />
      {/* 2. Añadir el componente Toaster para las notificaciones */}
      <Toaster
        position="bottom-right" // Posición en la pantalla
        reverseOrder={false}
        toastOptions={{
          // Estilos por defecto para las notificaciones
          style: {
            background: "#183021",
            color: "#fff",
            borderRadius: "8px",
          },
          // Estilos para notificaciones de éxito
          success: {
            style: {
              background: "#b8ff29",
              color: "#17251b",
            },
            iconTheme: {
              primary: "#17251b",
              secondary: "#b8ff29",
            },
          },
          // Estilos para notificaciones de error
          error: {
            style: {
              background: "#9f3028",
            },
          },
        }}
      />
    </div>
  );
}
