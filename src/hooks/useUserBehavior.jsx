import { useState, useEffect, useRef } from 'react';

const useUserBehavior = () => {
  const [userBehavior, setUserBehavior] = useState({
    timeOnPage: 0,
    timeInCart: 0,
    visitedCategories: {},
    viewedProducts: [],
    searchAttempts: 0,
    lastSearchResults: null,
    cartItems: [],
    isFirstVisit: true,
    scrollDepth: 0,
    clickPattern: [],
    sessionStartTime: Date.now()
  });

  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Verificar si es primera visita
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      setUserBehavior(prev => ({ ...prev, isFirstVisit: true }));
    } else {
      setUserBehavior(prev => ({ ...prev, isFirstVisit: false }));
    }

    // Iniciar tracking de tiempo
    intervalRef.current = setInterval(() => {
      setUserBehavior(prev => ({
        ...prev,
        timeOnPage: Date.now() - startTimeRef.current
      }));
    }, 1000);

    // Tracking de scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setUserBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }));
    };

    // Tracking de clicks
    const handleClick = (event) => {
      const clickData = {
        timestamp: Date.now(),
        element: event.target.tagName,
        className: event.target.className,
        x: event.clientX,
        y: event.clientY
      };

      setUserBehavior(prev => ({
        ...prev,
        clickPattern: [...prev.clickPattern.slice(-9), clickData] // Mantener últimos 10 clicks
      }));
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const trackCategoryVisit = (categoryName) => {
    setUserBehavior(prev => ({
      ...prev,
      visitedCategories: {
        ...prev.visitedCategories,
        [categoryName]: (prev.visitedCategories[categoryName] || 0) + 1
      }
    }));
  };

  const trackProductView = (product) => {
    setUserBehavior(prev => {
      const existingIndex = prev.viewedProducts.findIndex(p => p.id === product.id);
      let newViewedProducts;
      
      if (existingIndex !== -1) {
        // Producto ya visto, mover al final
        newViewedProducts = [
          ...prev.viewedProducts.slice(0, existingIndex),
          ...prev.viewedProducts.slice(existingIndex + 1),
          { ...product, viewCount: (prev.viewedProducts[existingIndex].viewCount || 1) + 1 }
        ];
      } else {
        // Nuevo producto
        newViewedProducts = [...prev.viewedProducts, { ...product, viewCount: 1 }];
      }

      // Mantener solo los últimos 20 productos vistos
      if (newViewedProducts.length > 20) {
        newViewedProducts = newViewedProducts.slice(-20);
      }

      return {
        ...prev,
        viewedProducts: newViewedProducts
      };
    });
  };

  const trackSearch = (searchTerm, resultsCount) => {
    setUserBehavior(prev => ({
      ...prev,
      searchAttempts: prev.searchAttempts + 1,
      lastSearchResults: resultsCount,
      lastSearchTerm: searchTerm
    }));
  };

  const trackCartActivity = (cartItems) => {
    const cartStartTime = userBehavior.cartStartTime || Date.now();
    
    setUserBehavior(prev => ({
      ...prev,
      cartItems: cartItems,
      timeInCart: Date.now() - cartStartTime,
      cartStartTime: prev.cartStartTime || Date.now()
    }));
  };

  const trackPageChange = (pageName) => {
    setUserBehavior(prev => ({
      ...prev,
      currentPage: pageName,
      pageHistory: [...(prev.pageHistory || []), {
        page: pageName,
        timestamp: Date.now(),
        timeSpent: Date.now() - (prev.lastPageChange || startTimeRef.current)
      }],
      lastPageChange: Date.now()
    }));
  };

  const getEngagementScore = () => {
    const timeScore = Math.min(userBehavior.timeOnPage / 60000, 1) * 25; // Max 25 puntos por tiempo (1 min = max)
    const scrollScore = (userBehavior.scrollDepth / 100) * 20; // Max 20 puntos por scroll
    const interactionScore = Math.min(userBehavior.clickPattern.length, 10) * 2; // Max 20 puntos por interacciones
    const productScore = Math.min(userBehavior.viewedProducts.length, 5) * 7; // Max 35 puntos por productos vistos
    
    return Math.round(timeScore + scrollScore + interactionScore + productScore);
  };

  const getUserIntent = () => {
    const behavior = userBehavior;
    
    if (behavior.cartItems.length > 0) {
      return 'purchase_intent';
    }
    
    if (behavior.searchAttempts > 2) {
      return 'research_intent';
    }
    
    if (behavior.viewedProducts.length > 3) {
      return 'browsing_intent';
    }
    
    if (behavior.timeOnPage < 30000) {
      return 'exploration_intent';
    }
    
    return 'unknown_intent';
  };

  return {
    userBehavior: {
      ...userBehavior,
      engagementScore: getEngagementScore(),
      userIntent: getUserIntent()
    },
    trackCategoryVisit,
    trackProductView,
    trackSearch,
    trackCartActivity,
    trackPageChange
  };
};

export default useUserBehavior;

