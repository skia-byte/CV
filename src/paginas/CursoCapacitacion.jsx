import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleCheck,
  ExternalLink,
  Play,
} from "lucide-react";
import { obtenerCurso } from "../data/cursos";
import { loadYouTubeIframeApi } from "../lib/youtubeIframeApi";

export default function CursoCapacitacion() {
  const { cursoId } = useParams();
  const navigate = useNavigate();
  const curso = obtenerCurso(cursoId);
  const playerContainer = useRef(null);
  const player = useRef(null);
  const [cargando, setCargando] = useState(true);
  const [errorVideo, setErrorVideo] = useState(false);

  useEffect(() => {
    if (!curso) return undefined;

    let activo = true;

    loadYouTubeIframeApi()
      .then((YT) => {
        if (!activo || !playerContainer.current) return;

        player.current = new YT.Player(playerContainer.current, {
          width: "100%",
          height: "100%",
          videoId: curso.videoId,
          playerVars: {
            enablejsapi: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (activo) setCargando(false);
            },
            onError: () => {
              if (activo) {
                setCargando(false);
                setErrorVideo(true);
              }
            },
            onStateChange: (event) => {
              if (Number(event.data) !== YT.PlayerState.ENDED) return;
              sessionStorage.setItem(
                `academia-video-visto:${curso.id}`,
                "true",
              );
              navigate(`/capacitacion/${curso.id}/cuestionario`);
            },
          },
        });
      })
      .catch(() => {
        if (activo) {
          setCargando(false);
          setErrorVideo(true);
        }
      });

    return () => {
      activo = false;
      player.current?.destroy();
      player.current = null;
    };
  }, [curso, navigate]);

  if (!curso) return <Navigate to="/inicio" replace />;

  return (
    <div className="min-h-screen bg-[#f2f5f0] pb-16 pt-24 text-[#18261d]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link
          to="/inicio#rutas"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#4d6544] transition hover:text-[#243c21]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Volver a los cursos
        </Link>

        <div className="mt-8 border-b border-[#dce4d9] pb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5a783e]">
            {curso.area} · Curso
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            {curso.titulo}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#5c685f]">
            {curso.descripcion}
          </p>
        </div>

        <section className="mt-7 overflow-hidden rounded-lg border border-[#dfe6dc] bg-[#14271d]">
          <div className="relative aspect-video w-full bg-black">
            <div ref={playerContainer} className="h-full w-full" />
            {cargando && !errorVideo && (
              <div className="absolute inset-0 grid place-items-center bg-[#14271d] text-sm font-semibold text-white/75">
                <span className="flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-[#b8ff29]" />
                  Cargando video...
                </span>
              </div>
            )}
            {errorVideo && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#14271d] px-5 text-center text-white">
                <p className="font-bold">No se pudo cargar el reproductor.</p>
                <a
                  href={`https://www.youtube.com/watch?v=${curso.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#c7f479] underline underline-offset-4"
                >
                  Abrir en YouTube <ExternalLink size={15} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem(
                      `academia-video-visto:${curso.id}`,
                      "true",
                    );
                    navigate(`/capacitacion/${curso.id}/cuestionario`);
                  }}
                  className="rounded-md bg-[#b8ff29] px-4 py-2.5 text-sm font-extrabold text-[#17251b]"
                >
                  Ya terminé el video
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#c7f479]">
                Video de aprendizaje
              </p>
              <h2 className="mt-1 text-lg font-extrabold">
                {curso.videoTitulo}
              </h2>
              <p className="mt-1 text-sm text-white/60">Canal: {curso.canal}</p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/75">
              <Play size={16} className="text-[#c7f479]" aria-hidden="true" />
              Reproduce el video completo
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-4 border-b border-[#dce4d9] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm leading-6 text-[#58645b]">
            <CircleCheck
              size={19}
              className="mt-0.5 shrink-0 text-[#6d8b45]"
              aria-hidden="true"
            />
            Al terminar el video, abriremos automáticamente el cuestionario del
            curso.
          </p>
          <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#718071]">
            <BookOpen size={15} aria-hidden="true" />
            Evaluación al finalizar
          </span>
        </section>

        <Link
          to="/inicio#rutas"
          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#466b2f] hover:text-[#243c21]"
        >
          Explorar otros cursos <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
