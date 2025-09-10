import React, { useState, useEffect, useRef } from 'react';

const AIRecommendationEngine = ({ userBehavior, products, onRecommendation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  // Usar useRef para evitar bucles infinitos
  const lastAnalysisRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Solo analizar si hay datos y no se ha analizado recientemente
    if (userBehavior && products.length > 0 && !hasAnalyzed) {
      // Crear un identificador único del comportamiento
      const behaviorId = JSON.stringify({
        userId: userBehavior.userId,
        interactionsCount: userBehavior.interactions?.length || 0,
        categoriesCount: Object.keys(userBehavior.visitedCategories || {}).length
      });

      // Solo ejecutar si el comportamiento ha cambiado significativamente
      if (lastAnalysisRef.current !== behaviorId) {
        // Limpiar timeout anterior
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Debounce: esperar 2 segundos antes de analizar
        timeoutRef.current = setTimeout(() => {
          analyzeAndRecommend();
          lastAnalysisRef.current = behaviorId;
          setHasAnalyzed(true);
          
          // Permitir nuevo análisis después de 30 segundos
          setTimeout(() => setHasAnalyzed(false), 30000);
        }, 2000);
      }
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [userBehavior, products]); // Mantener dependencias pero controlar ejecución

  const analyzeAndRecommend = async () => {
    if (isAnalyzing) return; // Prevenir ejecuciones múltiples
    
    setIsAnalyzing(true);
    
    try {
      // Simular análisis de IA (reducir tiempo de espera)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Algoritmo de recomendación basado en comportamiento del usuario
      const userInterests = extractUserInterests(userBehavior);
      const recommendedProducts = generateRecommendations(userInterests, products);
      
      setRecommendations(recommendedProducts);
      
      if (onRecommendation) {
        onRecommendation(recommendedProducts);
      }
      
      console.log('Recomendaciones de IA generadas:', recommendedProducts.length);
      
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback a recomendaciones básicas
      const basicRecommendations = products.slice(0, 4);
      setRecommendations(basicRecommendations);
      
      if (onRecommendation) {
        onRecommendation(basicRecommendations);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractUserInterests = (behavior) => {
    const interests = {
      categories: [],
      priceRange: { min: 0, max: Infinity },
      features: [],
      timeSpent: behavior?.timeSpent || 0
    };

    // Analizar categorías más visitadas (con validación)
    if (behavior?.visitedCategories && Object.keys(behavior.visitedCategories).length > 0) {
      interests.categories = Object.keys(behavior.visitedCategories)
        .sort((a, b) => behavior.visitedCategories[b] - behavior.visitedCategories[a])
        .slice(0, 3);
    }

    // Analizar rango de precios basado en productos vistos
    if (behavior?.viewedProducts && behavior.viewedProducts.length > 0) {
      const prices = behavior.viewedProducts
        .map(p => parseFloat(p.price?.replace('$', '').replace('.', '') || '0'))
        .filter(p => p > 0);
      
      if (prices.length > 0) {
        interests.priceRange.min = Math.min(...prices) * 0.8;
        interests.priceRange.max = Math.max(...prices) * 1.2;
      }
    }

    return interests;
  };

  const generateRecommendations = (interests, allProducts) => {
    if (!allProducts || allProducts.length === 0) {
      return [];
    }

    let scored = allProducts.map(product => {
      let score = 0;

      // Puntuación por categoría
      if (interests.categories.includes(product.category)) {
        score += 30;
      }

      // Puntuación por rango de precio
      const productPrice = parseFloat(product.price?.replace('$', '').replace('.', '') || '0');
      if (productPrice >= interests.priceRange.min && productPrice <= interests.priceRange.max) {
        score += 20;
      }

      // Puntuación por popularidad (productos destacados)
      if (product.destacado) {
        score += 15;
      }

      // Puntuación por novedad
      if (product.novedad) {
        score += 10;
      }

      // Puntuación aleatoria para diversidad (fija para evitar cambios constantes)
      score += Math.abs(product.id * 0.1) % 5;

      return { ...product, aiScore: score };
    });

    // Ordenar por puntuación y devolver los top 4
    return scored
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 4);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <span className="font-medium">IA analizando tus preferencias...</span>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 className="text-xl font-bold">🤖 Recomendaciones Web 4.0 IA</h3>
      </div>
      <p className="text-purple-100 mb-4">
        Basado en tu comportamiento de navegación y análisis predictivo, estos productos podrían interesarte:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((product, index) => (
          <div key={product.id} className="bg-white bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition-all duration-300">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-2"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/200x150/6366f1/ffffff?text=${encodeURIComponent(product.name)}`;
              }}
            />
            <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
            <p className="text-purple-100 text-xs mb-2">{product.price}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded">
                IA Score: {Math.round(product.aiScore)}
              </span>
              <button className="text-xs bg-yellow-400 text-purple-900 px-2 py-1 rounded hover:bg-yellow-300 transition-colors">
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="text-xs text-purple-200 bg-white bg-opacity-20 px-3 py-1 rounded-full">
          ✨ Powered by Web 4.0 AI Engine | Análisis Predictivo Avanzado
        </span>
      </div>
    </div>
  );
};

export default AIRecommendationEngine;