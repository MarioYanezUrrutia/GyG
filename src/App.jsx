import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import LayoutTopBar from './components/LayoutTopBar';
import LayoutNavBar from './components/LayoutNavBar';
import HomeCarousel from './components/HomeCarousel';
import HomeStepsSection from './components/HomeStepsSection';
import HomeProductSection from './components/HomeProductSection';
import HomeClientsSection from './components/HomeClientsSection';
import LayoutFooter from './components/LayoutFooter';
import AuthModal from './components/AuthModal';
import CategoryProductsDisplay from './components/CategoryProductsDisplay';
// import AIRecommendationEngine from './components/AIRecommendationEngine';
// import ProactiveAssistant from './components/ProactiveAssistant';
import ProactiveAssistant from './components/ProactiveAssistant';
import AIModal from './components/AIModal';
import ProductDetailPage from './components/ProductDetailPage';
import useUserBehavior from './hooks/useUserBehavior';

import { carouselData } from './mock/carouselData';
import { productsData } from './mock/productsData';
import { clientsData } from './mock/clientsData';
import { categoriesData } from './mock/categoriesData';

// Componente principal de la aplicación con routing
const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const navigate = useNavigate();
  
  // Web 4.0 - Integración de IA y comportamiento del usuario
  const { 
    userBehavior, 
    trackCategoryVisit, 
    trackProductView, 
    trackSearch, 
    trackCartActivity, 
    trackPageChange 
  } = useUserBehavior();

  const topBarItems = [
    'Blog interactivo',
    'Consejos de Diseño',
    'Cotizaciones',
    'Preguntas Frecuentes',
    'Seguimiento de pedidos',
  ];

  const navBarItems = categoriesData.map(cat => cat.name);

  const steps = [
    'Selecciona tu producto',
    'Personaliza tu diseño',
    'Agrega al carro',
    'Paga en línea',
    'Retira o recibe tu producto',
  ];

  const footerContact = {
    phone1: '+56 9 1234 5678',
    phone2: '+56 2 8765 4321',
    email: 'contacto@graficagyg.com',
    address: 'Av. Siempre Viva 742, Santiago, Chile',
  };

  const footerShippingLogos = [
    'https://via.placeholder.com/80x40/0a0059/FFFFFF?text=Envio1',
    'https://via.placeholder.com/80x40/0a0059/FFFFFF?text=Envio2',
  ];

  const footerPaymentLogos = [
    'https://via.placeholder.com/80x40/0a0059/FFFFFF?text=Pago1',
    'https://via.placeholder.com/80x40/0a0059/FFFFFF?text=Pago2',
  ];

  const handleCategoryClick = (categoryName) => {
    const category = categoriesData.find(cat => cat.name === categoryName);
    setSelectedCategory(category);
    setCurrentPage('category');
    trackCategoryVisit(categoryName);
    trackPageChange('category');
    navigate(`/categoria/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleLogoClick = () => {
    setCurrentPage('home');
    setSelectedCategory(null);
    trackPageChange('home');
    navigate('/');
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
    setCurrentPage('login');
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    setCurrentPage('home');
  };

  const handleSearch = (searchTerm) => {
    console.log('Buscando:', searchTerm);
    const results = productsData.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    trackSearch(searchTerm, results.length);
  };

  const handleProductView = (product) => {
    trackProductView(product);
    navigate(`/producto/${product.id}`);
  };

  const handleCartUpdate = (cartItems) => {
    trackCartActivity(cartItems);
  };

  const handleAIRecommendation = (recommendations) => {
    console.log('Recomendaciones de IA:', recommendations);
  };

  const handleProactiveAssistance = () => {
    setShowAIModal(true);
  };

  const handleCloseAIModal = () => {
    setShowAIModal(false);
  };

  // Componente para la página de inicio
  const HomePage = () => (
    <>
      <section className="container mx-auto py-8 px-4 md:px-8">
        <HomeCarousel slides={carouselData} />
      </section>

      <section>
        <HomeStepsSection steps={steps} />
      </section>

      <section>
        <HomeProductSection 
          title="Productos Destacados" 
          products={productsData.slice(0, 4)}
          onProductView={handleProductView}
        />
      </section>

      <section>
        <HomeProductSection 
          title="Soluciones Inteligentes" 
          products={productsData}
          onProductView={handleProductView}
        />
      </section>

      <section>
        <HomeProductSection 
          title="Novedades" 
          products={productsData.slice(2, 5)}
          onProductView={handleProductView}
        />
      </section>

      <section>
        <HomeClientsSection clients={clientsData} />
      </section>
    </>
  );

  // Componente para página de categoría
  const CategoryPage = () => {
    const { categoryName } = useParams();
    
    useEffect(() => {
      const category = categoriesData.find(cat => 
        cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName
      );
      if (category) {
        setSelectedCategory(category);
        trackCategoryVisit(category.name);
      }
    }, [categoryName]);

    if (!selectedCategory) return null;

    return (
      <CategoryProductsDisplay
        categoryName={selectedCategory.name}
        products={selectedCategory.products}
        onProductView={handleProductView}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 font-sans">
      <LayoutTopBar items={topBarItems} />
      <LayoutNavBar
        logo="https://via.placeholder.com/150x50/0a0059/FFFFFF?text=GraficaGyG"
        navItems={navBarItems}
        onLoginClick={handleLoginClick}
        onCartClick={() => console.log('Carrito clickeado')}
        onCategoryClick={handleCategoryClick}
        onLogoClick={handleLogoClick}
        onSearch={handleSearch}
        categoriesData={categoriesData}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categoria/:categoryName" element={<CategoryPage />} />
          <Route 
            path="/producto/:productId" 
            element={
              <ProductDetailPage 
                onProductView={handleProductView}
                onCartUpdate={handleCartUpdate}
              />
            } 
          />
        </Routes>
      </main>

      <LayoutFooter
        logo="https://via.placeholder.com/150x50/0a0059/FFFFFF?text=GraficaGyG"
        description="Somos una empresa dedicada a ofrecer soluciones gráficas de alta calidad con tecnología Web 4.0, integrando inteligencia artificial para una experiencia personalizada y proactiva."
        contact={footerContact}
        shippingLogos={footerShippingLogos}
        paymentLogos={footerPaymentLogos}
      />

      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      
      <ProactiveAssistant onRequestHelp={handleProactiveAssistance} />
      <AIModal isOpen={showAIModal} onClose={handleCloseAIModal} />
    </div>
  );
};

// Componente principal que envuelve con Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;