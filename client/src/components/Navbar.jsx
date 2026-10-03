import logo from "../assets/logo.svg";

function Navbar({ cartCount = 0 }) {
  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#productos", label: "Productos" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-hidden border-b border-[#A0522D]/20 bg-white shadow-[0_2px_12px_rgba(45,45,45,0.06)]">
      <nav
        className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-3 px-4 py-3 md:flex-row md:justify-between md:gap-6 md:py-2"
        aria-label="Navegación principal"
      >
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-2.5 font-titulos text-sm font-bold uppercase tracking-[0.06em] text-[#A0522D] no-underline hover:text-[#A0522D]"
        >
          <img
            src={logo}
            alt="Logo Mueblería Hermanos Jota"
            className="h-11 w-11 object-contain"
          />
          <span>Hermanos Jota</span>
        </a>

        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-4 p-0 md:flex-1 md:justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-[0.9rem] font-medium uppercase tracking-[0.08em] text-[#2D2D2D] no-underline transition-colors duration-300 hover:text-[#A0522D]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#carrito"
          className="relative inline-flex items-center justify-center rounded-full p-2 text-[#A0522D] no-underline transition-colors duration-300 hover:text-[#D4A437]"
          aria-label={`Carrito de compras, ${cartCount} productos`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13l-1.6 8M7 13l-3.6-8M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
          </svg>
          <span
            className="absolute -right-0.5 -top-0.5 flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full bg-[#A0522D] px-1.5 text-xs font-bold leading-none text-white"
            aria-live="polite"
          >
            {cartCount}
          </span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
