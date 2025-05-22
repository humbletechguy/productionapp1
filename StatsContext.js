// context/StatsContext.js
import {
  collection,
  doc,
  getDoc,
  onSnapshot
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseService';

const StatsContext = createContext(null);

export function StatsProvider({ children }) {
  const [businessStats, setBusinessStats] = useState({
    totals: { sales: 0, orders: 0, margin: 0 },
    retail: { sales: 0 },
    wholesale: { sales: 0 },
    salesTrend: [],
    profitMargins: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const colRef = collection(db, 'dailyStats');
    const unsub = onSnapshot(colRef, (snap) => {
      if (!snap.empty) {
        // Just grab the first doc for example
        const firstDoc = snap.docs[0];
        const data = firstDoc.data();
        setBusinessStats(data.stats || {});
        setLastUpdated(new Date());
      }
      setLoading(false);
    }, (err) => {
      console.error('Error in stats snapshot:', err);
      setError(err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function fetchShopifyData() {
    try {
      console.log('Fetching Shopify data...');
      await new Promise((res) => setTimeout(res, 500));
      // In real usage, you'd query an API then store in dailyStats
    } catch (err) {
      setError('Failed to fetch Shopify data');
    }
  }

  async function fetchHistoricalStats(dateString) {
    try {
      const snapshot = await getDoc(doc(db, 'dailyStats', dateString));
      if (snapshot.exists()) {
        const data = snapshot.data();
        setBusinessStats(data.stats || {});
        setLastUpdated(new Date());
      }
    } catch (err) {
      setError('Failed to load historical stats');
    }
  }

  return (
    <StatsContext.Provider
      value={{
        businessStats,
        loading,
        error,
        lastUpdated,
        fetchShopifyData,
        fetchHistoricalStats
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}