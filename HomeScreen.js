// screens/HomeScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import debounce from 'lodash.debounce';
import {
    Bell,
    BellRinging,
    CheckCircle,
    CloudArrowUp,
    MagnifyingGlass,
    Package,
    WarningCircle,
    XCircle
} from 'phosphor-react-native';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

// import ScreenLayout from '../components/ui/ScreenLayout';

// Example inventory context if you have it
import { useInventory } from '../context/InventoryContext.js';
// If you're fetching data from a custom service, import it:
import FirebaseService from '../firebase/firebaseService';

const { width } = Dimensions.get('window');

/** 
 * Animate numeric counters smoothly
 */
function useAnimatedNumber(target, duration = 500) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(value, {
      toValue: target,
      duration,
      useNativeDriver: false
    }).start();
  }, [target, duration, value]);

  return value;
}

export default function HomeScreen({ navigation }) {
  // =========== HOOKS & STATE ===========
  const { items = [] } = useInventory(); // if you have an InventoryContext
  const [loading, setLoading] = useState(true);
  const [shimmerVisible, setShimmerVisible] = useState(true);

  // Stats
  const [lowStock, setLowStock] = useState(0);
  const [batchesToday, setBatchesToday] = useState(0);
  const [wastePercent, setWastePercent] = useState(0);
  const [avgCost, setAvgCost] = useState(0);
  const [unitsToday, setUnitsToday] = useState(0);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifModal, setNotifModal] = useState(false);

  // Searching
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

  // Debounce for search
  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const results = await FirebaseService.fetchSearchResults(query); // or your method
        setSearchResults(results || []);
      } catch (err) {
        console.warn('Search error:', err);
        setSearchResults([]);
      }
    }, 300)
  ).current;

  // Animated counters
  const lowStockAnim = useAnimatedNumber(lowStock);
  const batchesAnim = useAnimatedNumber(batchesToday);

  // =========== EFFECTS & DATA FETCH ===========
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Trigger search if the user types
  useEffect(() => {
    debouncedSearch(search);
  }, [search]);

  function fetchInitialData() {
    setLoading(true);
    setShimmerVisible(true);

    // Calculate how many items are below threshold
    const calculatedLowStock = items.filter((i) => {
      const threshold = i.lowThreshold ?? 5;
      return (i.quantity ?? 0) <= threshold;
    }).length;
    setLowStock(calculatedLowStock);

    // Example parallel fetch
    Promise.all([
 //     FirebaseService.fetchTodayBatches(),
   //   FirebaseService.fetchProductionStats(),
     // FirebaseService.fetchNotifications()
    ])
      .then(([batchStats, prodStats, notifList]) => {
        // Batches Stats
        setBatchesToday(batchStats?.batchCount ?? 0);
        setUnitsToday(batchStats?.totalUnits ?? 0);

        // Production Stats
        setWastePercent(prodStats?.wastePercent ?? 0);
        setAvgCost(prodStats?.avgCost ?? 0);

        // Notifications
        setNotifications(notifList || []);
        const unread = (notifList || []).filter(n => !n.read).length;
        setUnreadCount(unread);
      })
      .catch((err) => console.warn('Error fetching data:', err))
      .finally(() => {
        setLoading(false);
        setTimeout(() => setShimmerVisible(false), 300);
      });
  }

  // =========== NAV & HANDLERS ===========
  function handleSelectSearchItem(item) {
    setSearchVisible(false);
    setSearch('');
    // Suppose item.type: 'ingredient', 'batch', 'recipe'
    if (item.type === 'ingredient') {
      navigation.navigate('IngredientScreen', { ingredientId: item.id });
    } else if (item.type === 'batch') {
      navigation.navigate('AddRecipe', { batchId: item.id });
    } else if (item.type === 'recipe') {
      navigation.navigate('RecipeScreen', { recipeId: item.id });
    }
  }

  function handleOpenNotifications() {
    setNotifModal(true);
  }
  function handleCloseNotifications() {
    setNotifModal(false);
  }

  function handleAddIngredient() {
    // This is from your existing home screen
    // to directly navigate to Ingredients or AddIngredient
    navigation.navigate('IngredientScreen'); 
  }

  // Example for refreshing data
  function handleRefresh() {
    fetchInitialData();
  }

  // =========== UI RENDERING ===========

  // Reusable shimmer
  function renderShimmer(style) {
    return (
      <ShimmerPlaceHolder
        style={[style, { borderRadius: 8 }]}
        shimmerStyle={{ borderRadius: 8 }}
        autoRun
        visible={!shimmerVisible}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Gradient Banner */}
      <LinearGradient colors={['#80bde3', '#c8e6ff']} style={styles.banner} />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MagnifyingGlass size={20} color="#999" />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setSearchVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.searchPlaceholder}>
            {search || 'Search batches, recipes, or ingredients...'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenNotifications}>
          <View style={{ position: 'relative', paddingLeft: 12 }}>
            {unreadCount > 0 ? (
              <BellRinging size={20} color="#999" />
            ) : (
              <Bell size={20} color="#999" />
            )}
            {unreadCount > 0 && (
              <View style={styles.unreadBadge} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Overlay */}
      {searchVisible && (
        <View style={styles.searchOverlay}>
          <View style={styles.searchHeader}>
            <TextInput
              style={styles.searchInput}
              autoFocus
              value={search}
              onChangeText={setSearch}
              placeholder="Search anything..."
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setSearchVisible(false)}>
              <XCircle size={20} color="#999" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 300 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchItem}
                onPress={() => handleSelectSearchItem(item)}
              >
                <Text style={styles.searchItemText}>
                  {item.name} ({item.type})
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              !search
                ? (
                  <View>
                    <Text style={{ color: '#aaa', margin: 16 }}>Suggested:</Text>
                    <TouchableOpacity
                      style={styles.searchItem}
                      onPress={() => setSearch('Vanilla Extract')}
                    >
                      <Text style={styles.searchItemText}>Vanilla Extract (ingredient)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.searchItem}
                      onPress={() => setSearch('Chocolate Cake')}
                    >
                      <Text style={styles.searchItemText}>Chocolate Cake (recipe)</Text>
                    </TouchableOpacity>
                  </View>
                )
                : null
            }
          />
        </View>
      )}

      {/* Main Content (ScrollView) */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 95 }}>
        {shimmerVisible ? (
          // Shimmer placeholders
          <View style={styles.shimmerWrapper}>
            {renderShimmer({ height: 40, width: '40%', marginBottom: 16 })}
            {renderShimmer({ height: 80, width: '95%', marginBottom: 12 })}
            {renderShimmer({ height: 80, width: '95%', marginBottom: 12 })}
          </View>
        ) : (
          <>
            {/* Quick Actions */}
            <View style={styles.card}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickActionsRow}
              >
                {/* Example quick action referencing your existing "Add Ingredient" button */}
                <QuickAction
                  label="Add Ingredient"
                  icon={<Package size={24} color="#333" />}
                  onPress={handleAddIngredient}
                />
                {/* Add more quick actions as you see fit */}
                <QuickAction
                  label="Refresh"
                  icon={<CloudArrowUp size={24} color="#333" />}
                  onPress={handleRefresh}
                />
              </ScrollView>
            </View>

            {/* 
              Merge your "Welcome to Home" text and low-inventory summary 
              into a new styled card
            */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Welcome to Home</Text>
              {/* Example summary items or stats */}
              <View style={styles.summaryCard}>
                <Text style={{ fontWeight: '600' }}>Low Inventory Items:</Text>
                <Text style={{ marginTop: 4 }}>
                  - Example: "Rose Fragrance" below threshold
                </Text>
                <Text>- Example: "Wick #10" below threshold</Text>
              </View>
            </View>

            {/* Production & Sales Stats (like the old advanced code) */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Production & Sales Stats</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.statsCarouselContainer}
              >
                <SwipeStat label="Low Stock" value={lowStock} />
                <SwipeStat label="Batches Today" value={batchesToday} />
                <SwipeStat label="Units Today" value={unitsToday} />
                <SwipeStat label="Waste %" value={`${wastePercent}%`} />
                <SwipeStat label="Avg Cost" value={`$${avgCost}`} />
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>


      {/* Notifications Modal */}
      <Modal
        isVisible={notifModal}
        onBackdropPress={handleCloseNotifications}
        style={styles.notifModal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <View style={styles.notifContainer}>
          <Text style={styles.notifTitle}>Notifications</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notifItem}>
                {item.icon === 'warning' ? (
                  <WarningCircle size={24} color="#E76F51" weight="regular" />
                ) : (
                  <CheckCircle size={24} color="#2A9D8F" weight="regular" />
                )}
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      fontWeight: item.read ? '400' : '700',
                      color: '#333',
                    }}
                  >
                    {item.text ?? 'No data'}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    {item.timeAgo ?? 'No time'}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
                No data
              </Text>
            }
          />
          <TouchableOpacity onPress={handleCloseNotifications} style={styles.closeNotifBtn}>
            <Text style={{ color: '#333', fontWeight: '600' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

// =========== Reusable Sub-Components ===========

function QuickAction({ label, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.quickActionIconCircle}>{icon}</View>
      <Text style={styles.quickActionText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SwipeStat({ label, value }) {
  return (
    <View style={styles.swipeStat}>
      <Text style={styles.swipeStatValue}>
        {value ?? 'No data'}
      </Text>
      <Text style={styles.swipeStatLabel}>{label}</Text>
    </View>
  );
}

function NavButton({ label, icon, active = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.navBtn, active && styles.navBtnActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ opacity: active ? 1 : 0.6 }}>{icon}</View>
      <Text style={[styles.navBtnLabel, active && { color: '#333', fontWeight: '700' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// =========== STYLES ===========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  banner: {
    height: Platform.OS === 'ios' ? 100 : 80,
    width: '100%'
  },
  searchBar: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: Platform.OS === 'ios' ? -50 : -40,
    zIndex: 2,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red'
  },
  searchOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    zIndex: 999
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginRight: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6
  },
  searchItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  searchItemText: {
    fontSize: 14,
    color: '#333'
  },
  shimmerWrapper: {
    padding: 16
  },
  // Card
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8
  },
  // Quick Actions
  quickActionsRow: {
    alignItems: 'center'
  },
  quickAction: {
    alignItems: 'center',
    marginRight: 16
  },
  quickActionIconCircle: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 4
  },
  quickActionText: {
    fontSize: 12,
    color: '#444'
  },
  // Stats
  statsCarouselContainer: {
    paddingHorizontal: 16
  },
  swipeStat: {
    alignItems: 'center',
    marginRight: 20
  },
  swipeStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222'
  },
  swipeStatLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center'
  },
  // Minimal Card (unused here, but can do):
  minimalCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1
  },
  minimalCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6
  },
  minimalCardItem: {
    fontSize: 13,
    color: '#555',
    marginVertical: 2
  },
 
  // Notifications
  notifModal: {
    margin: 0,
    justifyContent: 'flex-end'
  },
  notifContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    maxHeight: '70%'
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center'
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  closeNotifBtn: {
    backgroundColor: '#EEE',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 12
  }
});