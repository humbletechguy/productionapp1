// screens/RecipeScreen.js
import { collection, onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ScreenLayout from '../components/ui/ScreenLayout';
import { db } from '../firebase/firebaseService';

// OPTIONAL: If you'd like shimmer placeholders:
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function RecipeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Pull-to-refresh/loading states
  const [loading, setLoading] = useState(true);
  const [shimmerVisible, setShimmerVisible] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from Firestore
  function fetchRecipes() {
    setLoading(true);
    setShimmerVisible(true);

    const colRef = collection(db, 'recipes');
    const unsub = onSnapshot(colRef, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
      setLoading(false);

      // If using a shimmer effect, show it briefly
      setTimeout(() => setShimmerVisible(false), 300);
    });

    // Clean up subscription on unmount
    return () => unsub();
  }

  // For pull-to-refresh
  const onRefresh = useCallback(() => {
    fetchRecipes();
  }, []);

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  function handleMakeBatch(recipeId) {
    navigation.navigate('Production', { recipeId });
  }

  // (Optional) Render shimmer placeholder “cards” if loading
  function renderShimmer() {
    return (
      <View style={styles.shimmerCard}>
        <ShimmerPlaceHolder
          style={styles.shimmerLine}
          shimmerStyle={{ borderRadius: 8 }}
          autoRun
          visible={!shimmerVisible}
        />
        <ShimmerPlaceHolder
          style={styles.shimmerLine2}
          shimmerStyle={{ borderRadius: 8 }}
          autoRun
          visible={!shimmerVisible}
        />
      </View>
    );
  }

  function renderItem({ item }) {
    const isExpanded = expandedId === item.id;
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Text style={styles.cardTitle}>
            {item.name || 'Unnamed Recipe'} ({item.stock ?? 0} in stock)
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expanded}>
            <Text style={styles.expandedText}>
              <Text style={styles.expandedLabel}>Variants:</Text>{' '}
              {item.variants?.join(', ') || 'N/A'}
            </Text>
            <Text style={styles.expandedText}>
              <Text style={styles.expandedLabel}>Total Stock:</Text>{' '}
              {item.stock ?? 0}
            </Text>
            {/* Add more detail fields as desired (instructions, phases, etc.) */}

            <TouchableOpacity
              style={styles.batchBtn}
              onPress={() => handleMakeBatch(item.id)}
            >
              <Text style={styles.batchBtnText}>Make Batch</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <ScreenLayout title="Recipes">
      <View style={styles.container}>
        {loading && shimmerVisible ? (
          // Show shimmer placeholders
          <>
            {renderShimmer()}
            {renderShimmer()}
            {renderShimmer()}
          </>
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              !loading && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Recipes Found</Text>
                </View>
              )
            }
          />
        )}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // matches HomeScreen background
    paddingHorizontal: 16,
    paddingTop: 8
  },
  // Shimmer placeholder card
  shimmerCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    // same shadow style
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  shimmerLine: {
    width: '70%',
    height: 16,
    marginBottom: 12,
    borderRadius: 8
  },
  shimmerLine2: {
    width: '50%',
    height: 16,
    borderRadius: 8
  },
  // Card style
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    // same shadow style
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  expanded: {
    marginTop: 8,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12
  },
  expandedText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4
  },
  expandedLabel: {
    fontWeight: '600'
  },
  batchBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    alignSelf: 'flex-start'
  },
  batchBtnText: {
    color: '#FFF',
    fontWeight: '600'
  },
  emptyContainer: {
    marginTop: 32,
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 14,
    color: '#666'
  }
});