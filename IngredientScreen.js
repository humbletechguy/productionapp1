// screens/IngredientScreen.js
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { db } from '../firebase/firebaseService';

export default function IngredientScreen({ navigation }) {
  const [ingredients, setIngredients] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const colRef = collection(db, 'ingredients');
    const unsub = onSnapshot(colRef, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredients(data);
    });
    return () => unsub();
  }, []);

  function handleAddIngredient() {
    navigation.navigate('AddIngredient'); // if you have a nested stack or a global route
  }

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  function renderItem({ item }) {
    const isExpanded = expandedId === item.id;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={styles.cardTitle}>{item.name} ({item.quantity} {item.unit})</Text>
        {isExpanded && (
          <View style={styles.expanded}>
            <Text>Vendor: {item.preferredVendor || 'N/A'}</Text>
            <Text>Low Threshold: {item.lowStockThreshold || 0}</Text>
            <Text>Last Price: {item.lastPricePurchased || 0}</Text>
            <Text>Avg Price: {item.averagePricePurchased || 0}</Text>
            {/* shipping data, edit buttons, add-to-cart button, etc. */}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <ScreenLayout title="Ingredients">
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </TouchableOpacity>

        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  expanded: {
    marginTop: 8
  }
});