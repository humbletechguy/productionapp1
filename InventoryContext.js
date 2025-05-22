// context/InventoryContext.js
import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseService';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const colRef = collection(db, 'ingredients');
    const unsub = onSnapshot(colRef, snap => {
      setIngredients(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <InventoryContext.Provider value={{ ingredients }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}