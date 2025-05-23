import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection = ({ categories }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">
          Shop by Category
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-600 mb-16">
          Browse our wide selection of products across different categories
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform will-change-transform group-hover:-translate-y-1">
                <div className="h-44 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
