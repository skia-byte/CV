import { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#121212] rounded-[28px] shadow-2xl w-full max-w-md overflow-hidden border border-[#262626] animate-modal-in"
      >
        {/* Línea de acento superior con el verde lima de la agencia */}
        <div className="h-1.5 w-full bg-[#b8ff29]" />

        <div className="p-8">
          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-xl bg-[#1c1c1c] text-zinc-400 hover:bg-[#b8ff29] hover:text-black transition-all cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* Título */}
          {title && (
            <div className="text-center mb-6 pr-8">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {title}
              </h2>
              <div className="w-10 h-1 bg-[#b8ff29] mx-auto mt-2 rounded-full" />
            </div>
          )}

          {/* Contenido */}
          <main className="text-zinc-300 font-medium text-sm">{children}</main>
        </div>

        {/* Footer minimalista */}
        <div className="bg-[#0c0c0c] py-3 px-8 border-t border-[#222] flex justify-center">
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">
            Consigue Ventas Admin
          </p>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { transform: translateY(15px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-modal-in {
          animation: modal-in 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>,
    modalRoot,
  );
}
