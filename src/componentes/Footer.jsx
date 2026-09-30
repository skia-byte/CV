import { Link } from "react-router-dom";
import { ArrowUp, BookOpen, CircleHelp, UserRound } from "lucide-react";
import { useAuth } from "../context/authContext";

export default function Footer() {
  const { usuarioActual } = useAuth();
  const perfilUrl = `/perfil/${usuarioActual?.username || "user"}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#14271d] text-white">
      <button
        type="button"
        onClick={scrollToTop}
        title="Volver arriba"
        aria-label="Volver arriba"
        className="absolute -top-5 right-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#b8ff29] text-[#17251b] shadow-md transition hover:-translate-y-1 sm:right-8"
      >
        <ArrowUp size={19} aria-hidden="true" />
      </button>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#c7f479]">
            Consigue Ventas · Academia
          </p>
          <h2 className="mt-3 max-w-sm text-2xl font-black leading-tight sm:text-3xl">
            Aprender, compartir, crecer.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
            Un espacio para desarrollar habilidades y acompañarnos mejor en el
            trabajo de cada día.
          </p>
        </div>

        <nav aria-label="Recursos de aprendizaje" className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white/90">
            Aprendizaje
          </h3>
          <Link
            to="/inicio"
            className="flex items-center gap-3 text-sm text-white/70 transition hover:text-[#c7f479]"
          >
            <BookOpen size={17} aria-hidden="true" />
            Rutas de formación
          </Link>
          <Link
            to="/centrodeayuda"
            className="flex items-center gap-3 text-sm text-white/70 transition hover:text-[#c7f479]"
          >
            <CircleHelp size={17} aria-hidden="true" />
            Centro de ayuda
          </Link>
        </nav>

        <nav aria-label="Accesos del colaborador" className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white/90">
            Mi espacio
          </h3>
          <Link
            to={perfilUrl}
            className="flex items-center gap-3 text-sm text-white/70 transition hover:text-[#c7f479]"
          >
            <UserRound size={17} aria-hidden="true" />
            Mi perfil
          </Link>
          <Link
            to="/libro-de-reclamaciones"
            className="flex items-center gap-3 text-sm text-white/70 transition hover:text-[#c7f479]"
          >
            <CircleHelp size={17} aria-hidden="true" />
            Libro de reclamaciones
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-xs text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Consigue Ventas</p>
          <p>Espacio de aprendizaje para colaboradores</p>
        </div>
      </div>
    </footer>
  );
}
