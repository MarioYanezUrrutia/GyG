import React from 'react';

const HomeStepsSection = ({ steps = [] }) => {
  return (
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a0059] mb-10">
          Realiza tu compra en 5 sencillos pasos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#0a0059] to-[#f400e3] text-white text-2xl font-bold rounded-full mb-4 shadow-md">
                {index + 1}
              </div>
              <p className="text-lg font-semibold text-gray-800">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeStepsSection;