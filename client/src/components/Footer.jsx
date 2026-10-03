import logo from "../assets/logo.svg";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="mt-auto bg-[#A0522D] px-5 pb-6 pt-10 text-[#F5E6D3]"
    >
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <img
            src={logo}
            alt="Logo Mueblería Hermanos Jota"
            className="h-14 w-14 object-contain brightness-0 invert"
          />
          <h3 className="m-0 font-titulos text-lg font-bold uppercase tracking-[0.08em] text-white">
            Mueblería Hermanos Jota
          </h3>
          <p className="m-0 text-[0.92rem] leading-relaxed">
            Muebles de madera maciza hechos a mano, desde 1996.
          </p>
        </div>

        <div>
          <h4 className="mb-2.5 font-titulos text-base font-bold text-white">
            Contacto rápido
          </h4>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[0.92rem]">
            <li>
              <a
                href="mailto:info@hermanosjota.com.ar"
                className="text-[#F5E6D3] no-underline transition-colors duration-300 hover:text-[#D4A437]"
              >
                info@hermanosjota.com.ar
              </a>
            </li>
            <li>
              <a
                href="mailto:ventas@hermanosjota.com.ar"
                className="text-[#F5E6D3] no-underline transition-colors duration-300 hover:text-[#D4A437]"
              >
                ventas@hermanosjota.com.ar
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/541145678900"
                className="text-[#F5E6D3] no-underline transition-colors duration-300 hover:text-[#D4A437]"
              >
                WhatsApp: +54 11 4567-8900
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/hermanosjota_ba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5E6D3] no-underline transition-colors duration-300 hover:text-[#D4A437]"
              >
                Instagram: @hermanosjota_ba
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2.5 font-titulos text-base font-bold text-white">
            Showroom y taller
          </h4>
          <p className="m-0 text-[0.92rem] leading-relaxed">
            Av. San Juan 2847, Barrio de San Cristóbal
          </p>
          <p className="m-0 mt-1 text-[0.92rem] leading-relaxed">
            C1232AAB — CABA, Argentina
          </p>
          <p className="m-0 mt-3 text-[0.92rem] leading-relaxed">
            Lunes a viernes: 10 a 19 hs
          </p>
          <p className="m-0 text-[0.92rem] leading-relaxed">
            Sábados: 10 a 14 hs
          </p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[1120px] border-t border-[#F5E6D3]/25 pt-5 text-center text-xs">
        &copy; {year} Mueblería Hermanos Jota. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
