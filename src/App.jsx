import React from 'react';
import { CartProvider } from './CartContext';
import CartPage from './CartPage';

function App() {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}

export default App;
