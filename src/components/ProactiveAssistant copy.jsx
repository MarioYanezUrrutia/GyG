import React, { useState, useEffect } from 'react';

const ProactiveAssistant = ({ userBehavior, onAssistanceProvided }) => {
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [assistantState, setAssistantState] = useState('idle'); // idle, thinking, suggesting

  useEffect(() => {
    if (userBehavior) {
      analyzeUserBehavior(userBehavior);
    }
  }, [userBehavior]);

  const analyzeUserBehavior = (behavior) => {
    setAssistantState('thinking');
    
    setTimeout(() => {
      const suggestion = generateProactiveSuggestion(behavior);
      if (suggestion) {
        setCurrentSuggestion(suggestion);
        setIsVisible(true);
        setAssistantState('suggesting');
        
        if (onAssistanceProvided) {
          onAssistanceProvided(suggestion);
        }
      } else {
        setAssistantState('idle');
      }
    }, 2000);
  };

  const generateProactiveSuggestion = (behavior) => {
    const suggestions = [];

    // Sugerencia por tiempo en página
    if (behavior.timeOnPage > 30000) { // 30 segundos
      suggestions.push({
        type: 'time_based',
        title: '¿Necesitas ayuda?',
        message: 'Veo que has estado navegando por un tiempo. ¿Te gustaría que te ayude a encontrar algo específico?',
        action: 'offer_help',
        priority: 3
      });
    }

    // Sugerencia por productos vistos
    if (behavior.viewedProducts && behavior.viewedProducts.length > 3) {
      suggestions.push({
        type: 'product_interest',
        title: 'Productos similares',
        message: 'He notado tu interés en estos productos. ¿Te gustaría ver opciones similares o comparar precios?',
        action: 'show_similar',
        priority: 4
      });
    }

    // Sugerencia por carrito abandonado
    if (behavior.cartItems && behavior.cartItems.length > 0 && behavior.timeInCart > 60000) {
      suggestions.push({
        type: 'cart_abandonment',
        title: '¡No olvides tu carrito!',
        message: 'Tienes productos en tu carrito. ¿Te gustaría finalizar tu compra o necesitas más información?',
        action: 'complete_purchase',
        priority: 5
      });
    }

    // Sugerencia por búsquedas sin resultados
    if (behavior.searchAttempts > 2 && behavior.lastSearchResults === 0) {
      suggestions.push({
        type: 'search_help',
        title: 'Ayuda con la búsqueda',
        message: 'Parece que no encuentras lo que buscas. ¿Te ayudo a refinar tu búsqueda?',
        action: 'search_assistance',
        priority: 4
      });
    }

    // Sugerencia por primera visita
    if (behavior.isFirstVisit) {
      suggestions.push({
        type: 'welcome',
        title: '¡Bienvenido a GraficaGyG!',
        message: '¿Te gustaría un tour rápido de nuestros productos más populares?',
        action: 'show_tour',
        priority: 2
      });
    }

    // Devolver la sugerencia con mayor prioridad
    return suggestions.length > 0 
      ? suggestions.sort((a, b) => b.priority - a.priority)[0]
      : null;
  };

  const handleSuggestionAction = (action) => {
    switch (action) {
      case 'offer_help':
        // Abrir chat de ayuda
        console.log('Abriendo chat de ayuda');
        break;
      case 'show_similar':
        // Mostrar productos similares
        console.log('Mostrando productos similares');
        break;
      case 'complete_purchase':
        // Ir al carrito
        console.log('Redirigiendo al carrito');
        break;
      case 'search_assistance':
        // Ayuda con búsqueda
        console.log('Ofreciendo ayuda con búsqueda');
        break;
      case 'show_tour':
        // Iniciar tour
        console.log('Iniciando tour de productos');
        break;
      default:
        break;
    }
    
    setIsVisible(false);
    setAssistantState('idle');
  };

  const dismissSuggestion = () => {
    setIsVisible(false);
    setAssistantState('idle');
  };

  if (assistantState === 'thinking') {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="animate-pulse">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="text-sm">Analizando tu comportamiento...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isVisible || !currentSuggestion) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-sm">{currentSuggestion.title}</h4>
          </div>
          <button 
            onClick={dismissSuggestion}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-blue-100 mb-4">
          {currentSuggestion.message}
        </p>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => handleSuggestionAction(currentSuggestion.action)}
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Sí, ayúdame
          </button>
          <button 
            onClick={dismissSuggestion}
            className="bg-white bg-opacity-20 text-white px-3 py-1 rounded text-sm hover:bg-opacity-30 transition-colors"
          >
            No, gracias
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProactiveAssistant;

