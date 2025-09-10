import React, { useState, useRef } from 'react';
import { productsData } from '../mock/productsData'; // Ajusta la ruta según tu estructura

const AIModal = ({ isOpen, onClose }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const hasAnalyzedRef = useRef(false);

  React.useEffect(() => {
    if (isOpen && !hasAnalyzedRef.current) {
      generateRecommendations();
      hasAnalyzedRef.current = true;
    }
  }, [isOpen]);

  const generateRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simular análisis de IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generar recomendaciones inteligentes
    const scored = productsData.map(product => {
      const score = Math.random() * 100;
      return { ...product, aiScore: score };
    });

    const topRecommendations = scored
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 4);

    setRecommendations(topRecommendations);
    setIsAnalyzing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">🤖 Asistente IA Web 4.0</h2>
              <p className="text-purple-100">
                Análisis predictivo personalizado basado en tu comportamiento
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-purple-200 text-3xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          {isAnalyzing ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                IA analizando tus preferencias...
              </h3>
              <p className="text-gray-500">
                Procesando patrones de navegación y comportamiento
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-800 mb-2">
                  📊 Análisis Completado
                </h3>
                <p className="text-purple-700 text-sm">
                  He analizado tu comportamiento de navegación y he identificado productos que podrían interesarte basándome en algoritmos de machine learning.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  🎯 Recomendaciones Personalizadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((product, index) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex space-x-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-purple-600">
                              {product.price}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                IA Score: {Math.round(product.aiScore)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">
                  🧠 ¿Cómo funciona nuestra IA?
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Analiza patrones de navegación y tiempo en cada página</li>
                  <li>• Utiliza machine learning para predecir preferencias</li>
                  <li>• Se adapta continuamente a tu comportamiento</li>
                  <li>• Considera factores como categorías visitadas y rango de precios</li>
                </ul>
              </div>

              <div className="flex justify-center pt-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  ✨ Powered by Web 4.0 AI Engine | Tecnología Predictiva Avanzada
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModal;