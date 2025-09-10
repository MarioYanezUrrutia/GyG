import React from 'react';

const LayoutTopBar = ({ items = [] }) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#f400e3] to-[#f400e3] text-white text-sm py-2 px-4 md:px-8 flex justify-center items-center shadow-md">
      <nav className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2">
        {items.map((item, index) => (
          <a key={index} href="#" className="hover:underline transition-all duration-300">
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default LayoutTopBar;