import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { obtenerCurso } from "../data/cursos";

export default function CuestionarioCurso() {
  const { cursoId } = useParams();
  const curso = obtenerCurso(cursoId);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  if (!curso) return <Navigate to="/inicio" replace />;

  const videoCompletado =
    sessionStorage.getItem(`academia-video-visto:${curso.id}`) === "true";

  if (!videoCompletado) {
    return <Navigate to={`/capacitacion/${curso.id}`} replace />;
  }

  const enviarCuestionario = (event) => {
    event.preventDefault();

    if (Object.keys(respuestas).length !== curso.preguntas.length) {
      setMensaje("Responde todas las preguntas antes de enviar.");
      return;
    }

    const aciertos = curso.preguntas.reduce(
      (total, pregunta, index) =>
        total + (respuestas[index] === pregunta.correcta ? 1 : 0),
      0,
    );
    setResultado(aciertos);
    setMensaje("");
  };

  const aprobar = resultado !== null && resultado >= 3;

  const reiniciar = () => {
    setRespuestas({});
    setResultado(null);
    setMensaje("");
  };

  return (
    <div className="min-h-screen bg-[#f2f5f0] pb-16 pt-24 text-[#18261d]">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Link
          to={`/capacitacion/${curso.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#4d6544] transition hover:text-[#243c21]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Volver al video
        </Link>

        <div className="mt-8 border-b border-[#dce4d9] pb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5a783e]">
            Evaluación · {curso.area}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            {curso.titulo}
          </h1>
          <p className="mt-3 text-base leading-7 text-[#5c685f]">
            Responde las preguntas para revisar lo aprendido. Necesitas 3 de 4
            respuestas correctas para aprobar.
          </p>
        </div>

        {resultado === null ? (
          <form onSubmit={enviarCuestionario} className="mt-7 space-y-5">
            {curso.preguntas.map((pregunta, index) => (
              <fieldset
                key={pregunta.pregunta}
                className="rounded-lg border border-[#dfe6dc] bg-white p-5 sm:p-6"
              >
                <legend className="w-full text-base font-extrabold leading-6 text-[#1b2a20]">
                  <span className="mr-2 text-sm font-black text-[#7b9853]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {pregunta.pregunta}
                </legend>
                <div className="mt-4 space-y-2">
                  {pregunta.opciones.map((opcion, opcionIndex) => (
                    <label
                      key={opcion}
                      className={`flex cursor-pointer items-start gap-3 rounded-md border px-4 py-3 text-sm leading-5 transition ${
                        respuestas[index] === opcionIndex
                          ? "border-[#78964d] bg-[#f4f8ef] text-[#243c21]"
                          : "border-[#e7ece4] text-[#536057] hover:border-[#bbc9b2]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`pregunta-${index}`}
                        value={opcionIndex}
                        checked={respuestas[index] === opcionIndex}
                        onChange={() => {
                          setRespuestas((actuales) => ({
                            ...actuales,
                            [index]: opcionIndex,
                          }));
                          setMensaje("");
                        }}
                        className="mt-1 accent-[#5e7e3d]"
                      />
                      {opcion}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}

            {mensaje && (
              <p role="alert" className="text-sm font-bold text-[#a3382e]">
                {mensaje}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[#1b3022] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#2d4b31] focus:outline-none focus:ring-2 focus:ring-[#78964d] focus:ring-offset-2"
            >
              Enviar respuestas <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : (
          <section
            aria-live="polite"
            className="mt-8 rounded-lg border border-[#dfe6dc] bg-white p-6 sm:p-9"
          >
            <div
              className={`grid h-12 w-12 place-items-center rounded-md ${
                aprobar
                  ? "bg-[#eef7df] text-[#4d7131]"
                  : "bg-[#fff0ed] text-[#a3382e]"
              }`}
            >
              {aprobar ? <Check size={24} /> : <X size={24} />}
            </div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#5a783e]">
              {aprobar ? "Curso aprobado" : "Puedes volver a intentarlo"}
            </p>
            <h2 className="mt-2 text-3xl font-black">
              {resultado} de {curso.preguntas.length} respuestas correctas
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5c685f]">
              {aprobar
                ? "Buen trabajo. Ya revisaste los contenidos y aprobaste la evaluación."
                : "Repasa los conceptos del curso y vuelve a responder el cuestionario."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {aprobar ? (
                <Link
                  to="/inicio#rutas"
                  className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[#1b3022] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#2d4b31]"
                >
                  Volver a los cursos{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={reiniciar}
                  className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[#1b3022] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#2d4b31]"
                >
                  Intentar de nuevo <RotateCcw size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
