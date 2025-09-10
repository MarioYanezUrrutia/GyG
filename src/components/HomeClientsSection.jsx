import React from 'react';

const HomeClientsSection = ({ clients = [] }) => {
  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a0059] mb-10">
          Nuestros Clientes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-center items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <img src={client.logo} alt={client.name} className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeClientsSection;