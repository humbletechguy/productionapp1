// components/ui/ScreenLayout.js
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScreenLayout({ children }) {
  const [search, setSearch] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#80bde3', '#c8e6ff']} style={styles.banner} />

      {/* Example search bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Text style={styles.searchPlaceholder}>
            {search || 'Search...'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* The rest of your content */}
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  banner: {
    height: 100,
    width: '100%',
  },
  searchBar: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: -50,
    borderRadius: 8,
    padding: 12,
  },
  searchPlaceholder: {
    color: '#666'
  },
});