import React from 'react';

const LayoutFooter = ({ logo = 'https://via.placeholder.com/150x50/0a0059/FFFFFF?text=LOGO', description = 'Somos una empresa dedicada a ofrecer soluciones de impresión de alta calidad, con un enfoque en la innovación y la satisfacción del cliente.', contact = {}, shippingLogos = [], paymentLogos = [] }) => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0a0059] to-[#0a0059] text-white py-12 px-4 md:px-8 shadow-inner">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Columna 1: Logo y Descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="Logo de la empresa" className="h-16 object-contain mb-4" />
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Columna 2: Contacto */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-[#f400e3] mb-5">Tienda Online - Ventas</h3>
          <ul className="space-y-3 text-gray-300">
            {contact.phone1 && (
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9.5l-2.5 2.5a4.999 4.999 0 006.5 6.5l2.5-2.5 4.816 1.512A1 1 0 0121 18.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                <span>{contact.phone1}</span>
              </li>
            )}
            {contact.phone2 && (
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684L10.5 9.5l-2.5 2.5a4.999 4.999 0 006.5 6.5l2.5-2.5 4.816 1.512A1 1 0 0121 18.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                <span>{contact.phone2}</span>
              </li>
            )}
            {contact.email && (
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0h18"></path></svg>
                <span>{contact.email}</span>
              </li>
            )}
            {contact.address && (
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>{contact.address}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Columna 3: Métodos de Envío y Pago */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-[#f400e3] mb-5">Métodos de Envío</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            {shippingLogos.map((logoSrc, index) => (
              <img key={index} src={logoSrc} alt={`Envío ${index}`} className="h-10 object-contain" />
            ))}
          </div>

          <h3 className="text-xl font-bold text-[#f400e3] mb-5">Métodos de Pago</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {paymentLogos.map((logoSrc, index) => (
              <img key={index} src={logoSrc} alt={`Pago ${index}`} className="h-10 object-contain" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} PrintFlow. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default LayoutFooter;