import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Datos de ejemplo - luego conectarás con tu API o mock data
  const product = {
    id: 1,
    name: "Libretas",
    description: "Tarjetas de alta calidad con acabados premium para profesionales que buscan destacar",
    price: "$15.990",
    images: [
      "/images/productos/libreta.png",
      "/images/productos/apretador-papeles.png",
      "/images/productos/vaso-mug.png"
    ],
    features: [
      "Papel couché 300gr de alta calidad",
      "Acabado brillante o mate disponible",
      "Impresión full color ambos lados",
      "Corte preciso y profesional",
      "Entrega en 48 horas hábiles"
    ],
    specifications: {
      material: "Papel couché 300gr",
      tamaño: "8.5 x 5.5 cm",
      acabados: "Brillante, Mate, UV selectivo",
      tiempoEntrega: "48-72 horas",
      cantidadMinima: "100 unidades"
    },
    category: "Impresos Digitales"
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-[#0a0059] hover:text-[#f400e3] transition-colors duration-300 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver atrás
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sección de Imágenes con Carrusel */}
          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Flechas de navegación */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-[#0a0059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-[#0a0059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="flex justify-center mt-6 space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'border-[#f400e3] shadow-md' 
                        : 'border-gray-300 hover:border-[#0a0059]'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vista ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Precio debajo de la imagen */}
            <div className="mt-6 text-center">
              <span className="text-3xl font-bold text-[#f400e3]">
                {product.price}
              </span>
              <p className="text-sm text-gray-600 mt-2">IVA incluido</p>
            </div>
          </div>

          {/* Sección de Detalles */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-[#0a0059] font-semibold bg-[#0a0059]/10 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a0059] mt-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Características Principales */}
            <div>
              <h3 className="text-xl font-semibold text-[#0a0059] mb-4">
                Características Principales
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-[#f400e3] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Especificaciones Técnicas */}
            <div>
              <h3 className="text-xl font-semibold text-[#0a0059] mb-4">
                Especificaciones Técnicas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm font-semibold text-[#0a0059] capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <p className="text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="flex-1 py-3 bg-gradient-to-br from-[#0a0059] to-[#f400e3] text-white font-bold rounded-lg hover:from-[#f400e3] hover:to-[#0a0059] transition-all duration-300 shadow-md">
                Agregar al Carrito
              </button>
              <button className="flex-1 py-3 border-2 border-[#0a0059] text-[#0a0059] font-bold rounded-lg hover:bg-[#0a0059] hover:text-white transition-all duration-300">
                Solicitar Cotización
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;