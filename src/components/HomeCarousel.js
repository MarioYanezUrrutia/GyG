import React, { useState, useEffect } from 'react';

const HomeCarousel = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.text}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
              <h2 className="text-white text-2xl md:text-4xl font-bold text-center drop-shadow-lg">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;