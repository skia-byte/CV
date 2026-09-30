import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const navItems = [
  { to: "/inicio", label: "Mi aprendizaje" },
  { to: "/centrodeayuda", label: "Centro de ayuda" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { usuarioActual, cerrarSesion } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const perfilUrl = `/perfil/${usuarioActual?.username || "user"}`;
  const nombreColaborador =
    usuarioActual?.nombre ||
    usuarioActual?.displayName ||
    usuarioActual?.username ||
    "Mi perfil";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const renderNavItems = (mobile = false) => (
    <>
      {navItems.map(({ to, label }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
            className={`${
              mobile
                ? "block rounded-md px-4 py-3 text-base"
                : "rounded-md px-3 py-2 text-sm"
            } font-bold transition-colors ${
              active
                ? "bg-white/10 text-[#c7f479]"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#14271d] text-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
          <Link
            to="/inicio"
            className="flex shrink-0 items-center gap-3"
            aria-label="Consigue Ventas Academia, inicio"
          >
            <span className="text-2xl font-black tracking-tight text-[#b8ff29]">
              CV<span className="text-white">.</span>
            </span>
            <span className="hidden border-l border-white/20 pl-3 text-xs font-bold uppercase tracking-[0.14em] text-white/75 sm:block">
              Academia
            </span>
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1 lg:flex"
          >
            {renderNavItems()}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {usuarioActual ? (
              <>
                <Link
                  to={perfilUrl}
                  className="hidden max-w-44 truncate rounded-md px-3 py-2 text-sm font-bold text-white/85 transition hover:bg-white/10 hover:text-white sm:block"
                >
                  {nombreColaborador}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                  className="hidden h-10 w-10 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-[#c7f479] sm:flex"
                >
                  <FaSignOutAlt aria-hidden="true" />
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="hidden rounded-md px-3 py-2 text-sm font-bold text-white/85 transition hover:bg-white/10 hover:text-white sm:block"
              >
                Ingresar
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-md text-xl text-white transition hover:bg-white/10 lg:hidden"
            >
              <FaBars aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#14271d] text-white lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <Link
              to="/inicio"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black text-[#b8ff29]"
            >
              CV<span className="text-white">.</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-white hover:bg-white/10"
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Navegación móvil"
            className="flex flex-1 flex-col gap-2 px-5 py-8"
          >
            {renderNavItems(true)}
          </nav>

          <div className="border-t border-white/10 p-5">
            {usuarioActual ? (
              <div className="flex flex-col gap-3">
                <Link
                  to={perfilUrl}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md bg-white/5 px-4 py-3 text-sm font-bold text-white"
                >
                  {nombreColaborador}
                  <span className="mt-1 block text-xs font-medium text-white/60">
                    Ver perfil
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-md bg-[#b8ff29] px-4 py-3 text-sm font-extrabold text-[#17251b]"
                >
                  <FaSignOutAlt aria-hidden="true" />
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block rounded-md bg-[#b8ff29] px-4 py-3 text-center text-sm font-extrabold text-[#17251b]"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
