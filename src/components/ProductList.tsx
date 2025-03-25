import React from "react";
import type { Product } from "../App";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4 flex flex-col">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-auto object-cover mb-2 rounded"
            />
            <h3 className="text-xl font-bold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-semibold mt-auto">${product.price.toFixed(2)}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;