import React from 'react';
import ProductCard from './ProductCard';

const CategoryProductsDisplay = ({ categoryName = '', products = [] }) => {
  if (!categoryName || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a0059] mb-10">
          {categoryName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsDisplay;