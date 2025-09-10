import React, { useState, useEffect, useCallback } from 'react';

const HomeCarousel = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Función estable para cambiar slides
  const nextSlide = useCallback(() => {
    if (slides && slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [slides?.length]);

  // Auto-play controlado
  useEffect(() => {
    // Solo ejecutar si hay slides válidos
    if (!slides || slides.length <= 1) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides?.length, nextSlide]);

  // Resetear si no hay slides
  useEffect(() => {
    if (!slides || slides.length === 0) {
      setCurrentSlide(0);
    } else if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides, currentSlide]);

  // Carrusel por defecto si no hay slides
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 bg-gradient-to-r from-[#0a0059] to-[#f400e3] rounded-lg shadow-xl flex items-center justify-center">
        <div className="text-white text-center p-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            ¡Bienvenido a GraficaG&G!
          </h2>
          <p className="text-lg md:text-xl opacity-90">
            Diseños que Impresionan
          </p>
        </div>
      </div>
    );
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      {/* Contenedor de slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            {/* USAR IMÁGENES FIJAS PARA EVITAR ERRORES DE RED */}
            <div 
              className="w-full h-64 md:h-96 bg-gradient-to-r from-[#0a0059] to-[#f400e3] flex items-center justify-center"
            >
              <div className="text-white text-center p-8">
                <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                  {slide.text || `Slide ${index + 1}`}
                </h2>
                {slide.subtitle && (
                  <p className="text-lg md:text-xl opacity-90 mt-2 drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCarousel;