import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useModal as useAppModal } from "../context/ModalContext";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { iniciarSesion, iniciarConGoogle } = useAuth();
  const { mostrarModal: mostrarNotificacion } = useAppModal();
  const navigate = useNavigate();

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPass, setLoginPass] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await iniciarSesion(loginIdentifier, loginPass);
      navigate("/inicio");
    } catch (err) {
      // Forzamos un aviso claro sin tintes morados
      mostrarNotificacion(
        "Error al iniciar sesión",
        "Usuario o contraseña incorrectos.",
      );
    }
  }

  async function handleGoogleSignIn() {
    try {
      await iniciarConGoogle();
      navigate("/inicio");
    } catch (err) {
      mostrarNotificacion("Error con Google", err.message);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-[#0a0a0a] overflow-hidden font-sans text-white">
      {/* LADO IZQUIERDO: acceso a la academia interna */}
      <div className="hidden lg:flex lg:w-[58%] relative bg-black items-center justify-center overflow-hidden border-r border-[#222]">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-tr from-black via-[#0a0a0a]/95 to-transparent" />

        <div className="relative z-10 px-16 max-w-2xl text-left">
          <div className="inline-block bg-[#b8ff29] text-black font-black text-xs tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-6 shadow-xl">
            Academia de colaboradores
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-[1.1] mb-6 uppercase">
            Aprendemos{" "}
            <span className="bg-[#b8ff29] text-black px-2 py-0.5 rounded-lg inline-block transform -rotate-1">
              en equipo
            </span>{" "}
            para crecer{" "}
            <span className="bg-[#b8ff29] text-black px-2 py-0.5 rounded-lg inline-block transform rotate-1">
              cada día
            </span>
          </h1>
          <p className="text-zinc-400 font-medium text-base leading-relaxed">
            Ingresa a tus rutas de capacitación, recursos y herramientas para
            seguir creciendo junto al equipo de Consigue Ventas.
          </p>
        </div>

        <div className="absolute bottom-6 left-12 right-12 flex items-center justify-between text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] border-t border-[#222] pt-4">
          <span>Aprendizaje continuo</span>
          <span>•</span>
          <span>Desarrollo colaborativo</span>
          <span>•</span>
          <span>2026</span>
        </div>
      </div>

      {/* LADO DERECHO: Formulario de Ingreso */}
      <div className="w-full lg:w-[42%] flex flex-col justify-between px-8 sm:px-16 py-10 bg-[#0c0c0c]">
        <div className="flex justify-between items-center">
          <div className="font-black text-xs tracking-tighter uppercase text-white">
            CONSIGUE <span className="text-[#b8ff29]">VENTAS · ACADEMIA</span>
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
            Acceso de colaboradores
          </span>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Bienvenido de nuevo
            </h2>
            <p className="text-zinc-400 text-xs font-medium mt-2">
              Ingresa con la cuenta asignada por tu equipo.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-black text-zinc-300 uppercase ml-2 mb-2 block tracking-widest">
                Usuario o correo corporativo
              </label>
              <div className="relative">
                <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-[#b8ff29]" />
                <input
                  type="text"
                  placeholder="Tu usuario o correo de trabajo"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-[#141414] border-2 border-[#2a2a2a] rounded-[22px] text-white font-semibold text-sm transition-all focus:outline-none focus:border-[#b8ff29] focus:ring-4 focus:ring-[#b8ff29]/10 placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-zinc-300 uppercase ml-2 tracking-widest">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    mostrarNotificacion(
                      "Recuperación",
                      "Contacta al administrador para restablecer tu clave.",
                    );
                  }}
                  className="text-[11px] font-bold text-[#b8ff29] hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#b8ff29]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-[#141414] border-2 border-[#2a2a2a] rounded-[22px] text-white font-semibold text-sm transition-all focus:outline-none focus:border-[#b8ff29] focus:ring-4 focus:ring-[#b8ff29]/10 placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#b8ff29] text-black py-4 rounded-[22px] font-black uppercase tracking-widest text-xs shadow-lg shadow-[#b8ff29]/10 hover:bg-[#a3e624] transition-all transform active:scale-[0.99] cursor-pointer"
            >
              Entrar a la academia →
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#222]"></div>
            </div>
            <span className="relative bg-[#0c0c0c] px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
              O continúa con tu cuenta corporativa
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-[#141414] border-2 border-[#2a2a2a] text-white py-4 rounded-[22px] font-black uppercase text-xs tracking-wider hover:bg-[#1a1a1a] transition-all shadow-sm cursor-pointer"
          >
            <FcGoogle size={22} /> Continuar con Google
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] pt-6 border-t border-[#222]">
          <span>© {new Date().getFullYear()} Consigue Ventas</span>
          <span>Academia de colaboradores</span>
        </div>
      </div>
    </div>
  );
}
