// context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseService'; // <-- local file

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartRef = doc(db, 'cart', 'cartDoc');
    const unsub = onSnapshot(cartRef, (snap) => {
      if (snap.exists()) {
        setCartItems(snap.data().cartItems || []);
      } else {
        setCartItems([]);
      }
    });
    return () => unsub();
  }, []);

  async function clearCart() {
    const cartRef = doc(db, 'cart', 'cartDoc');
    await updateDoc(cartRef, { cartItems: [] });
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}