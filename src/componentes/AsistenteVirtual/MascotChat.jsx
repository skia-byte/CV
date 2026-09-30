import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Send } from "lucide-react";
import { Link } from "react-router-dom";
import mascotaImg from "../img/asistente-mascota.png";

const respuestasBot = {
  1: "Para problemas técnicos con la página, intenta limpiar la caché o usar otro navegador.",
  2: "Puedes conocer nuestros servicios de estrategia y marketing desde la sección Servicios.",
  3: "Para gestionar tu perfil y datos personales, ingresa a la sección 'Mi Cuenta'.",
  4: {
    text: "¡Hola de nuevo! He activado la lectura automática para todos nuestros mensajes. ¿En qué más puedo ayudarte?",
    type: "inclusive",
  },
  5: "Nuestros canales de atención oficiales atienden de Lunes a Viernes de 9am a 6pm.",
};

const MascotChat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "¡Hola! Soy el asistente de Consigue Ventas. Elige una opción para ayudarte:\n1. Problemas con la página\n2. Servicios de marketing\n3. Gestión de perfil\n4. Atención inclusiva\n5. Horarios de atención",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [vozActivada, setVozActivada] = useState(false);
  const messagesEndRef = useRef(null);

  const obtenerTextoPlano = (msg) => {
    if (typeof msg.text === "string") return msg.text;
    return "Esa opción no es válida. Por favor, elige un número del 1 al 5. O contacta al WhatsApp: +51 939 339 299";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const ultimoMensaje = messages[messages.length - 1];
    if (
      ultimoMensaje?.sender === "bot" &&
      (ultimoMensaje.type === "inclusive" || vozActivada)
    ) {
      if (ultimoMensaje.type === "inclusive") setVozActivada(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        obtenerTextoPlano(ultimoMensaje),
      );
      utterance.lang = "es-ES";
      window.speechSynthesis.speak(utterance);
    }
  }, [messages, vozActivada]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userQuery = input.trim();
    setMessages((prev) => [...prev, { text: userQuery, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      const data = respuestasBot[userQuery];
      setMessages((prev) => [
        ...prev,
        data
          ? {
              sender: "bot",
              text: typeof data === "object" ? data.text : data,
              type: data.type || "text",
            }
          : {
              sender: "bot",
              text: (
                <div className="flex flex-col gap-2 w-full text-left">
                  <p>
                    Esa opción no es válida. Por favor, elige un número del 1 al
                    5.
                  </p>
                  <p className="text-xs italic text-gray-600">
                    O contacta al WhatsApp: +51 939 339 299
                  </p>
                  <Link
                    to="/centrodeayuda"
                    className="bg-[#71277a] text-white text-center py-2 rounded-lg font-bold no-underline"
                  >
                    Ir al Centro de Ayuda
                  </Link>
                </div>
              ),
            },
      ]);
    }, 1000);
  };

  return (
    <div className="mascot-chat-container w-[calc(100vw-2rem)] sm:w-[350px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#00d1b2] p-4 sm:p-5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={mascotaImg}
              alt="Mascota"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 p-1 object-contain"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#00d1b2] rounded-full" />
          </div>
          <h3 className="font-bold text-base sm:text-lg leading-none">
            Asistente virtual
          </h3>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-black/10 p-1 rounded-full transition-colors"
        >
          <ChevronDown size={28} />
        </button>
      </div>

      <div
        className="p-4 sm:p-5 bg-gray-50 flex-1 max-h-[45vh] sm:max-h-[380px] overflow-y-auto space-y-4 flex flex-col"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-[#71277a] text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"}`}
            >
              {typeof msg.text === "string" ? (
                <p className="whitespace-pre-line text-sm">{msg.text}</p>
              ) : (
                msg.text
              )}
              {(msg.type === "inclusive" ||
                (vozActivada && msg.sender === "bot")) && (
                <div className="flex flex-col gap-2 mt-3 border-t pt-2 border-gray-100">
                  <button
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(
                        obtenerTextoPlano(msg),
                      );
                      utterance.lang = "es-ES";
                      window.speechSynthesis.speak(utterance);
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-xl text-[11px] font-bold"
                  >
                    🔊 Escuchar de nuevo
                  </button>
                  {msg.type === "inclusive" && (
                    <button
                      onClick={() =>
                        document.body.classList.toggle("high-contrast")
                      }
                      className="flex items-center justify-center gap-2 bg-gray-900 text-white p-2 rounded-xl text-[11px] font-bold"
                    >
                      🌓 Alto Contraste
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            to="/unete"
            className="py-2 px-4 bg-white border border-[#00d1b2] text-[#00d1b2] rounded-full text-[11px] font-bold hover:bg-[#00d1b2] hover:text-white transition-all shadow-sm no-underline"
          >
            Conversemos
          </Link>
          <Link
            to="/libro-de-reclamaciones"
            className="py-2 px-4 bg-white border border-[#00d1b2] text-[#00d1b2] rounded-full text-[11px] font-bold hover:bg-[#00d1b2] hover:text-white transition-all shadow-sm no-underline"
          >
            Reclamaciones
          </Link>
          <Link
            to="/centrodeayuda"
            className="py-2 px-4 bg-white border border-[#00d1b2] text-[#00d1b2] rounded-full text-[11px] font-bold hover:bg-[#00d1b2] hover:text-white transition-all shadow-sm no-underline"
          >
            Centro de Ayuda
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un número..."
          className="flex-1 bg-gray-100 border-none rounded-2xl px-4 py-2.5 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className={`p-2.5 rounded-full transition-all ${input.trim() ? "bg-[#71277a] text-white shadow-md" : "bg-gray-200 text-gray-400 opacity-50"}`}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MascotChat;
