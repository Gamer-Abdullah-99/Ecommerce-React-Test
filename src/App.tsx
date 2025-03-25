import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

const App: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      title: "Cosmic Lamp",
      description: "Illuminate your space with cosmic vibes.",
      price: 29.99,
      imageUrl: "https://picsum.photos/seed/cosmic1/300/200",
    },
    {
      id: 2,
      title: "Galactic Chair",
      description: "Sit back and relax in a galactic atmosphere.",
      price: 39.99,
      imageUrl: "https://picsum.photos/seed/cosmic2/300/200",
    },
    {
      id: 3,
      title: "Nebula Clock",
      description: "Time flies in a nebula of creativity.",
      price: 19.99,
      imageUrl: "https://picsum.photos/seed/cosmic3/300/200",
    },
    {
      id: 4,
      title: "Stellar Vase",
      description: "A vase that holds the beauty of the stars.",
      price: 49.99,
      imageUrl: "https://picsum.photos/seed/cosmic4/300/200",
    },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
      <header className="bg-gradient-to-r from-purple-800 to-blue-900 p-4">
        <h1 className="text-2xl font-semibold">Cosmic E-Commerce Store</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/4">
            <ProductList products={products} onAddToCart={addToCart} />
          </div>
          <div className="w-full lg:w-1/4">
            <Cart
              cartItems={cartItems}
              onRemove={removeFromCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-blue-900 to-purple-800 p-4 text-center">
        <p>&copy; 2023 Cosmic E-Commerce Store</p>
      </footer>
    </div>
  );
};

export default App;