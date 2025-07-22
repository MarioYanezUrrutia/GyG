import React from 'react';

const ProductCard = ({ product = { name: 'Producto', image: 'https://via.placeholder.com/300x200/0a0059/FFFFFF?text=Producto', description: 'Descripción del producto.', price: '$0.00' } }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-[#0a0059] mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#f400e3]">{product.price}</span>
          <button className="px-5 py-2 bg-gradient-to-br from-[#0a0059] to-[#f400e3] text-white rounded-lg hover:from-[#f400e3] hover:to-[#0a0059] transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


// DONE