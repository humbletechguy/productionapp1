// screens/PackagingScreen.js
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { db } from '../firebase/firebaseService';

export default function PackagingScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const colRef = collection(db, 'packaging');
    const unsub = onSnapshot(colRef, snap => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <ScreenLayout title="Packaging">
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text>Quantity: {item.quantity} {item.unit}</Text>
              {/* Possibly an image, etc. */}
            </View>
          )}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  cardTitle: { fontWeight: '700', marginBottom: 4 }
});