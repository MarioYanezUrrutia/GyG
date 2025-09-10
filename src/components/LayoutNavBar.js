import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Asegúrate de que ProductCard esté disponible

const LayoutNavBar = ({ logo = 'https://via.placeholder.com/150x50/0a0059/FFFFFF?text=LOGO', navItems = [], onLoginClick = () => {}, onCartClick = () => {}, onCategoryClick = () => {}, onSearch = () => {}, categoriesData = [] }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const getCategoryProducts = (categoryName) => {
    const category = categoriesData.find(cat => cat.name === categoryName);
    return category ? category.products : [];
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#0a0059] to-[#0a0059] text-white shadow-lg py-4 px-4 md:px-8 relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <img src={logo} alt="Logo de la empresa" className="h-12 object-contain" />
          <div className="md:hidden flex items-center gap-4">
            <button onClick={onCartClick} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 active:scale-95">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"></path></svg>
            </button>
            <button onClick={onLoginClick} className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Iniciar Sesión
            </button>
          </div>
        </div>
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredCategory(item)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button onClick={() => onCategoryClick(item)} className="hover:text-[#f400e3] transition-colors duration-300 text-lg font-medium py-2">
                  {item}
                </button>
                {hoveredCategory === item && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 bg-white rounded-lg shadow-xl w-[80vw] max-w-4xl z-20 border border-gray-200 animate-fade-in-down">
                    <h3 className="text-xl font-bold text-[#0a0059] mb-4 text-center">{item}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                      {getCategoryProducts(item).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f400e3] transition-all duration-300 w-32 md:w-48"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch(e.target.value);
                }
              }}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          <button onClick={onCartClick} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 active:scale-95">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"></path></svg>
          </button>
          <button onClick={onLoginClick} className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutNavBar;