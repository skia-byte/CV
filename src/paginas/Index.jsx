import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Compass,
  Play,
  Search,
  Users,
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { cursos } from "../data/cursos";

import slide1 from "../componentes/img/slide1.png";

const areas = ["Todas", ...new Set(cursos.map((curso) => curso.area))];

export default function Inicio() {
  const { usuarioActual } = useAuth();
  const [areaActiva, setAreaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const nombre =
    usuarioActual?.nombre ||
    usuarioActual?.displayName ||
    usuarioActual?.email?.split("@")[0] ||
    "colaborador";
  const primerNombre = nombre.trim().split(/\s+/)[0];

  const cursosFiltrados = cursos.filter((curso) => {
    const coincideArea = areaActiva === "Todas" || curso.area === areaActiva;
    const texto =
      `${curso.titulo} ${curso.descripcion} ${curso.area}`.toLowerCase();
    return coincideArea && texto.includes(busqueda.trim().toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f2f5f0] pb-16 text-[#18261d]">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#49604e]">
            <span className="h-2 w-2 rounded-full bg-[#b8ff29]" />
            Consigue Ventas <span className="text-[#98a69a]">/</span> Academia
          </p>
          <Link
            to={`/perfil/${usuarioActual?.username || "user"}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#33483a] transition hover:text-[#567d2e]"
          >
            <Users size={17} aria-hidden="true" />
            Mi espacio <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <section className="relative isolate overflow-hidden rounded-lg bg-[#14271d] text-white">
          <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[52%]">
            <img
              src={slide1}
              alt=""
              className="h-full w-full object-cover object-center opacity-45"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#14271d] via-[#14271d]/80 to-[#14271d]/20" />
          </div>

          <div className="max-w-3xl px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c7f479]">
              <Compass size={16} aria-hidden="true" />
              Tu espacio de aprendizaje
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] sm:text-5xl">
              Hola, {primerNombre}.
              <span className="mt-2 block text-[#c7f479]">
                Crecemos cuando aprendemos juntos.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Desarrolla herramientas que puedes aplicar en tu trabajo, desde
              organizar datos hasta comunicar ideas y crear contenido.
            </p>
            <a
              href="#rutas"
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-md bg-[#b8ff29] px-5 py-3 text-sm font-extrabold text-[#17251b] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#14271d]"
            >
              Ver cursos <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="absolute bottom-5 right-6 hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/75 md:flex lg:right-10">
            <BookOpen size={16} aria-hidden="true" />
            Aprende a tu ritmo
          </div>
        </section>

        <section
          aria-label="Resumen de la academia"
          className="grid grid-cols-1 divide-y divide-[#dce4d9] border-b border-[#dce4d9] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <div className="flex items-center gap-4 py-5 sm:px-6">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-[#476a2e]">
              <BookOpen size={20} aria-hidden="true" />
            </span>
            <p className="text-sm text-[#56645a]">
              <strong className="block text-lg text-[#18261d]">
                {cursos.length} cursos
              </strong>
              con video y cuestionario
            </p>
          </div>
          <div className="flex items-center gap-4 py-5 sm:px-6">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-[#476a2e]">
              <Compass size={20} aria-hidden="true" />
            </span>
            <p className="text-sm text-[#56645a]">
              <strong className="block text-lg text-[#18261d]">
                {areas.length - 1} áreas
              </strong>
              para desarrollar habilidades
            </p>
          </div>
          <div className="flex items-center gap-4 py-5 sm:px-6">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-[#476a2e]">
              <Users size={20} aria-hidden="true" />
            </span>
            <p className="text-sm text-[#56645a]">
              <strong className="block text-lg text-[#18261d]">
                En equipo
              </strong>
              conocimiento compartido
            </p>
          </div>
        </section>

        <section id="rutas" className="scroll-mt-24 pt-12 sm:pt-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5a783e]">
                Biblioteca de aprendizaje
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Elige tu próximo curso
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#5c685f]">
                Cada curso incluye un video de YouTube y un cuestionario para
                comprobar lo aprendido.
              </p>
            </div>

            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Buscar cursos</span>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77847a]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar un curso..."
                className="h-12 w-full rounded-md border border-[#d9e0d6] bg-white pl-11 pr-4 text-sm text-[#18261d] outline-none transition placeholder:text-[#8a958c] focus:border-[#719245] focus:ring-2 focus:ring-[#b8ff29]/40"
              />
            </label>
          </div>

          <div
            className="mt-7 flex gap-2 overflow-x-auto pb-2"
            aria-label="Filtrar cursos por área"
          >
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                aria-pressed={areaActiva === area}
                onClick={() => setAreaActiva(area)}
                className={`shrink-0 rounded-md px-4 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#719245] ${
                  areaActiva === area
                    ? "bg-[#1b3022] text-white"
                    : "border border-[#d9e0d6] bg-white text-[#4d5c51] hover:border-[#9aac8f]"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          {cursosFiltrados.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {cursosFiltrados.map((curso) => (
                <article
                  key={curso.id}
                  className="overflow-hidden rounded-lg border border-[#e0e6dd] bg-white"
                >
                  <div className="relative h-44 overflow-hidden bg-[#dce6d8]">
                    <img
                      src={curso.imagen}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    />
                    <span className="absolute left-4 top-4 rounded-sm bg-[#f7ffec] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#3f5d2b]">
                      {curso.area}
                    </span>
                  </div>
                  <div className="flex min-h-[230px] flex-col p-5">
                    <h3 className="text-xl font-extrabold leading-snug text-[#1b2a20]">
                      {curso.titulo}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#647067]">
                      {curso.descripcion}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#edf0eb] pt-4">
                      <span className="text-xs font-semibold text-[#748078]">
                        Video + evaluación
                      </span>
                      <Link
                        to={`/capacitacion/${curso.id}`}
                        className="inline-flex items-center gap-2 text-sm font-extrabold text-[#466b2f] hover:text-[#243c21] focus:outline-none focus:underline"
                      >
                        <Play size={15} aria-hidden="true" />
                        Ver curso
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 border border-dashed border-[#cbd6c7] bg-white px-6 py-12 text-center">
              <p className="font-bold text-[#33483a]">
                No encontramos ese curso
              </p>
              <p className="mt-1 text-sm text-[#69756c]">
                Prueba con otro término o selecciona otra área.
              </p>
            </div>
          )}
        </section>

        <section className="mt-14 border-t border-[#dce4d9] pt-9">
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5a783e]">
              Herramientas del equipo
            </p>
            <h2 className="mt-2 text-2xl font-black">¿Necesitas una mano?</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/centrodeayuda"
              className="group flex items-center justify-between gap-4 rounded-lg border border-[#dfe6dc] bg-white p-5 transition hover:border-[#9caf8f]"
            >
              <span className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[#eef5e8] text-[#4c6b35]">
                  <CircleHelp size={21} aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-base text-[#1c2d21]">
                    Centro de ayuda
                  </strong>
                  <span className="mt-1 block text-sm text-[#667269]">
                    Encuentra respuestas y canales de contacto.
                  </span>
                </span>
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-[#6a8749] transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              to={`/perfil/${usuarioActual?.username || "user"}`}
              className="group flex items-center justify-between gap-4 rounded-lg border border-[#dfe6dc] bg-white p-5 transition hover:border-[#9caf8f]"
            >
              <span className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[#eef5e8] text-[#4c6b35]">
                  <Users size={21} aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-base text-[#1c2d21]">
                    Perfil de colaborador
                  </strong>
                  <span className="mt-1 block text-sm text-[#667269]">
                    Revisa y actualiza tu información.
                  </span>
                </span>
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-[#6a8749] transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
