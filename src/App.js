import React, { useState } from 'react';
import LayoutTopBar from './components/LayoutTopBar';
import LayoutNavBar from './components/LayoutNavBar';
import HomeCarousel from './components/HomeCarousel';
import HomeStepsSection from './components/HomeStepsSection';
import HomeProductSection from './components/HomeProductSection';
import HomeClientsSection from './components/HomeClientsSection';
import LayoutFooter from './components/LayoutFooter';
import AuthModal from './components/AuthModal';
import CategoryProductsDisplay from './components/CategoryProductsDisplay';

import { carouselData } from './mock/carouselData';
import { productsData } from './mock/productsData';
import { clientsData } from './mock/clientsData';
import { categoriesData } from './mock/categoriesData';

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'category', 'login', 'register'
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    email: 'contacto@printflow.com',
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
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
    setCurrentPage('login');
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
    setCurrentPage('home'); // Regresar a home al cerrar el modal
  };

  const handleSearch = (searchTerm) => {
    console.log('Buscando:', searchTerm);
    // Aquí iría la lógica para filtrar productos o navegar a una página de resultados de búsqueda
    // Por ahora, solo lo logueamos.
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      <LayoutTopBar items={topBarItems} />
      <LayoutNavBar
        logo="https://via.placeholder.com/150x50/0a0059/FFFFFF?text=PrintFlow"
        navItems={navBarItems}
        onLoginClick={handleLoginClick}
        onCartClick={() => console.log('Carrito clickeado')}
        onCategoryClick={handleCategoryClick}
        onSearch={handleSearch}
        categoriesData={categoriesData} // Pasar categoriesData al LayoutNavBar
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <section className="container mx-auto py-8 px-4 md:px-8">
              <HomeCarousel slides={carouselData} />
            </section>

            <section>
              <HomeStepsSection steps={steps} />
            </section>

            <section>
              <HomeProductSection title="Productos Destacados" products={productsData.slice(0, 4)} />
            </section>

            <section>
              <HomeProductSection title="Todos Nuestros Productos" products={productsData} />
            </section>

            <section>
              <HomeProductSection title="Novedades" products={productsData.slice(2, 5)} />
            </section>

            <section>
              <HomeClientsSection clients={clientsData} />
            </section>
          </>
        )}

        {currentPage === 'category' && selectedCategory && (
          <CategoryProductsDisplay
            categoryName={selectedCategory.name}
            products={selectedCategory.products}
          />
        )}
      </main>

      <LayoutFooter
        logo="https://via.placeholder.com/150x50/0a0059/FFFFFF?text=PrintFlow"
        description="Somos una empresa dedicada a ofrecer soluciones de impresión de alta calidad, con un enfoque en la innovación y la satisfacción del cliente."
        contact={footerContact}
        shippingLogos={footerShippingLogos}
        paymentLogos={footerPaymentLogos}
      />

      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </div>
  );
};

export default App;