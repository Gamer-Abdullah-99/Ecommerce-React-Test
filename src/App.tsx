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
      title: "Product 1",
      description: "This is product 1.",
      price: 29.99,
      imageUrl: "https://picsum.photos/seed/1/300/200",
    },
    {
      id: 2,
      title: "Product 2",
      description: "This is product 2.",
      price: 39.99,
      imageUrl: "https://picsum.photos/seed/2/300/200",
    },
    {
      id: 3,
      title: "Product 3",
      description: "This is product 3.",
      price: 19.99,
      imageUrl: "https://picsum.photos/seed/3/300/200",
    },
    {
      id: 4,
      title: "Product 4",
      description: "This is product 4.",
      price: 49.99,
      imageUrl: "https://picsum.photos/seed/4/300/200",
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
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-semibold">E-Commerce Store</h1>
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
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2023 E-Commerce Store</p>
      </footer>
    </div>
  );
};

export default App;