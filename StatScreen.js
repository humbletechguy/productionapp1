import { useContext, useEffect, useRef, useState } from 'react';
import { 
  Alert,
  Dimensions, 
  RefreshControl, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';

import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { UploadSimple, Storefront, ShoppingCartSimple } from 'phosphor-react-native';

import ScreenLayout from '../components/ui/ScreenLayout';
import SwipeStat from '../components/ui/SwipeStat'; 
import { StatsContext } from '../context/StatsContext';

const { width } = Dimensions.get('screen');

export default function StatScreen() {
  const scrollRef = useRef(null);
  const statsContext = useContext(StatsContext);

  // If no context is available yet, render a fallback:
  if (!statsContext) {
    return (
      <ScreenLayout title="Stats">
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Stats unavailable. Please try again later.</Text>
        </View>
      </ScreenLayout>
    );
  }

  const {
    businessStats,
    loading: contextLoading,
    fetchShopifyData,
    fetchFaireData,
    importCSVData
  } = statsContext;

  // Basic local state for loading spinner
  const [loading, setLoading] = useState(contextLoading);

  useEffect(() => {
    setLoading(contextLoading);
  }, [contextLoading]);

  // ---- Safely destructure stats to avoid chart errors ----
  const safeSalesTrend = businessStats?.salesTrend ?? [];
  const safeProfitMargins = businessStats?.profitMargins ?? [];
  const safeTopProducts = businessStats?.topProducts ?? [];
  const safeTotals = businessStats?.totals ?? {};
  const safeRetail = businessStats?.retail ?? {};
  const safeWholesale = businessStats?.wholesale ?? {};

  // ---- Prepare chart data ----
  const salesLabels = safeSalesTrend.length
    ? safeSalesTrend.map((item) => item.x.toString())
    : ['No data'];
  const salesData = safeSalesTrend.length
    ? safeSalesTrend.map((item) => item.y)
    : [0];

  const marginLabels = safeProfitMargins.length
    ? safeProfitMargins.map((item) => item.product)
    : ['No data'];
  const marginData = safeProfitMargins.length
    ? safeProfitMargins.map((item) => item.margin)
    : [0];

  const pieChartData = safeTopProducts.length
    ? safeTopProducts.map((item, idx) => ({
        name: item.product,
        population: item.sales,
        color: ['#4a90e2', '#90e24a', '#e24ad9', '#f0a500', '#ccc'][idx % 5],
        legendFontColor: '#333',
        legendFontSize: 12,
      }))
    : [{
        name: 'No data',
        population: 1,
        color: '#ccc',
        legendFontColor: '#333',
        legendFontSize: 12,
      }];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(74,144,226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51,51,51, ${opacity})`,
    style: { borderRadius: 8 },
    propsForDots: { r: '4', strokeWidth: '2', stroke: '#4a90e2' },
  };

  // ---- Handlers ----
  const handleCSVImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'application/vnd.ms-excel']
      });
      if (result.canceled) return;

      const csvUri = result.assets?.[0]?.uri;
      if (!csvUri) return Alert.alert('Error', 'No file URI found.');

      const csvString = await FileSystem.readAsStringAsync(csvUri);
      Papa.parse(csvString, {
        header: true,
        complete: ({ data }) => {
          if (!Array.isArray(data) || !data.length) {
            return Alert.alert('Error', 'No valid rows found in CSV.');
          }
          importCSVData(data);
          Alert.alert('Success', 'CSV data imported successfully.');
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          Alert.alert('Error', 'CSV parsing failed.');
        },
      });
    } catch (error) {
      console.error('Import Error:', error);
      Alert.alert('Error', 'Import failed.');
    }
  };

  const handleFaireUpload = () => {
    // Example placeholder for Faire data flow
    Alert.alert('Faire', 'Faire upload flow not yet implemented.');
  };

  const handleShopifySync = () => {
    // Example placeholder for Shopify
    Alert.alert('Shopify', 'Shopify sync flow not yet implemented.');
  };

  const onRefresh = () => {
    setLoading(true);
    Promise.all([fetchShopifyData(), fetchFaireData()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  // ---- Render ----
  return (
    <ScreenLayout title="Stats">
      <View style={styles.container}>
        {/* Pull-to-refresh on big ScrollView */}
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          <View style={styles.banner} />

          {/* Quick Action Row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionContainer}
          >
            <TouchableOpacity style={styles.quickAction} onPress={handleCSVImport}>
              <View style={styles.quickActionIconCircle}>
                <UploadSimple size={22} color="#333" />
              </View>
              <Text style={styles.quickActionText}>Import CSV</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={handleFaireUpload}>
              <View style={styles.quickActionIconCircle}>
                <Storefront size={22} color="#333" />
              </View>
              <Text style={styles.quickActionText}>Faire</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={handleShopifySync}>
              <View style={styles.quickActionIconCircle}>
                <ShoppingCartSimple size={22} color="#333" />
              </View>
              <Text style={styles.quickActionText}>Shopify</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Key Metrics (SwipeStats) */}
          <Text style={styles.carouselTitle}>Key Metrics</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsCarouselContainer}
          >
            <SwipeStat label="Sales" value={safeTotals.sales ?? 0} type="currency" />
            <SwipeStat label="Orders" value={safeTotals.orders ?? 0} />
            <SwipeStat label="Margin" value={safeTotals.margin ?? 0} type="percent" />
            <SwipeStat label="Retail Sales" value={safeRetail.sales ?? 0} type="currency" />
            <SwipeStat label="Wholesale Sales" value={safeWholesale.sales ?? 0} type="currency" />
          </ScrollView>

          {/* Sales Trend (Line Chart) */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sales Trend</Text>
            <LineChart
              data={{ labels: salesLabels, datasets: [{ data: salesData }] }}
              width={width * 0.9}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
            />
          </View>

          {/* Profit Margins (Bar Chart) */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profit Margins</Text>
            <BarChart
              data={{ labels: marginLabels, datasets: [{ data: marginData }] }}
              width={width * 0.9}
              height={220}
              chartConfig={chartConfig}
              style={styles.chartStyle}
            />
          </View>

          {/* Top Selling Products (Pie Chart) */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Selling Products</Text>
            <PieChart
              data={pieChartData}
              width={width * 0.9}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chartStyle}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: 100, // space so content doesn't run behind a bottom nav
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  banner: {
    height: 2,
    backgroundColor: '#DDD',
    width: '100%',
  },
  quickActionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  quickAction: {
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionIconCircle: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: '#555',
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginLeft: 16,
    marginBottom: 8,
  },
  statsCarouselContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: width * 0.9,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 8,
  },
});