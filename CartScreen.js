// screens/CartScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, clearCart } = useCart();

  function renderItem({ item }) {
    return (
      <View style={styles.itemCard}>
        <Text style={styles.itemName}>{item.name || 'No Name'}</Text>
        <Text>Qty: {item.quantity || 0}</Text>
        <Text>Vendor: {item.vendor || 'N/A'}</Text>
      </View>
    );
  }

  return (
    <ScreenLayout title="Cart">
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <Text style={styles.clearTxt}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  itemCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 12
  },
  itemName: { fontWeight: '700', marginBottom: 4 },
  clearBtn: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 6
  },
  clearTxt: { color: '#fff', fontWeight: '600', textAlign: 'center' }
});