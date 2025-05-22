// screens/ProductScreen.js
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { db } from '../firebase/firebaseService';

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const colRef = collection(db, 'products');
    const unsubscribe = onSnapshot(colRef, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });
    return () => unsubscribe();
  }, []);

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  function renderItem({ item }) {
    const isExpanded = expandedId === item.id;
    return (
      <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
        <Text style={styles.cardTitle}>
          {item.name} — Stock: {item.stock ?? 0}
        </Text>
        {isExpanded && (
          <View style={styles.expanded}>
            <Text>Low Threshold: {item.lowThreshold ?? 0}</Text>
            <Text>Cost per unit: ${item.costPerUnit ?? 0}</Text>
            <Text>Retail price: ${item.retailPrice ?? 0}</Text>
            <Text>Wholesale price: ${item.wholesalePrice ?? 0}</Text>
            {/* Add more fields as needed */}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <ScreenLayout title="Products">
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  expanded: {
    marginTop: 8
  }
});