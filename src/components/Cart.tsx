import React from "react";
import type { CartItem } from "../App";

interface CartProps {
  cartItems: CartItem[];
  onRemove: (productId: number) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove, onIncrease, onDecrease }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-800 border border-gray-700 rounded shadow p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-300">Cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-white">{item.product.title}</h3>
                  <p className="text-sm text-gray-300">${item.product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDecrease(item.product.id)}
                  className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onIncrease(item.product.id)}
                  className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={() => alert("Checkout functionality is simulated.")}
              className="mt-2 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;