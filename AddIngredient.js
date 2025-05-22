// screens/AddIngredient.js
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { db } from '../firebase/firebaseService';
import { parseCSV } from '../utils/csvHelper';

export default function AddIngredient({ navigation }) {
  const [parsedItems, setParsedItems] = useState([
    { name: '', quantity: '', unit: '', price: '', vendor: '', shippingShare: '' }
  ]);

  async function handleCSVImport() {
    const data = await parseCSV(null);
    setParsedItems(data);
  }

  async function handleAIImport() {
    Alert.alert(
      'Upload Method',
      'How would you like to upload your receipt?',
      [
        { text: 'Take Photo', onPress: () => console.log('Camera') },
        { text: 'Choose from Gallery', onPress: () => console.log('Gallery') },
        { text: 'Upload from Files', onPress: () => console.log('Files') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  }

  function handleEditItem(index, field, value) {
    const newItems = [...parsedItems];
    newItems[index][field] = value;
    setParsedItems(newItems);
  }

  async function handleSaveAll() {
    for (let item of parsedItems) {
      await addDoc(collection(db, 'ingredients'), {
        name: item.name || 'Unnamed',
        quantity: item.quantity || 0,
        unit: item.unit || '',
        lastPricePurchased: item.price || 0,
        shippingShare: item.shippingShare || 0,
        vendor: item.vendor || ''
      });
    }
    navigation.goBack();
  }

  return (
    <ScreenLayout title="Add Ingredient">
      <View style={styles.container}>
        {/* Two options for uploading */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.importBtn} onPress={() => setParsedItems([{ name: '', quantity: '', unit: '', price: '', vendor: '', shippingShare: '' }])}>
            <Text style={styles.importText}>Option 1: Manual Entry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.importBtn} onPress={handleAIImport}>
            <Text style={styles.importText}>Option 2: Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Show parsed items */}
        <FlatList
          data={parsedItems}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.parsedCard}>
              <TextInput
                style={styles.input}
                value={item.name}
                onChangeText={(val) => handleEditItem(index, 'name', val)}
                placeholder="Name"
              />
              <TextInput
                style={styles.input}
                value={String(item.quantity || '')}
                onChangeText={(val) => handleEditItem(index, 'quantity', parseFloat(val) || '')}
                placeholder="Quantity"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={item.unit}
                onChangeText={(val) => handleEditItem(index, 'unit', val)}
                placeholder="Unit"
              />
              <TextInput
                style={styles.input}
                value={String(item.price || '')}
                onChangeText={(val) => handleEditItem(index, 'price', parseFloat(val) || '')}
                placeholder="Price"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={item.vendor}
                onChangeText={(val) => handleEditItem(index, 'vendor', val)}
                placeholder="Vendor"
              />
              <TextInput
                style={styles.input}
                value={String(item.shippingShare || '')}
                onChangeText={(val) => handleEditItem(index, 'shippingShare', parseFloat(val) || '')}
                placeholder="Shipping Share"
                keyboardType="numeric"
              />
            </View>
          )}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAll}>
          <Text style={styles.saveText}>Save to Firestore</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  buttonRow: { flexDirection: 'row', marginBottom: 12 },
  importBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8
  },
  importText: { color: '#fff', fontWeight: '600' },
  parsedCard: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
    elevation: 2
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    color: '#333'
  },
  saveBtn: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 6,
    marginTop: 12
  },
  saveText: { color: '#fff', fontWeight: '700', textAlign: 'center' }
});