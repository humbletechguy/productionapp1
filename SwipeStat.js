import { Text, View } from 'react-native';

export default function SwipeStat({ label, value, type }) {
  let displayValue = 'No data';

  if (type === 'currency') {
    displayValue = typeof value === 'number' ? `$${value.toFixed(2)}` : 'No data';
  } else if (type === 'percent') {
    displayValue = typeof value === 'number' ? `${value.toFixed(1)}%` : 'No data';
  } else {
    displayValue = typeof value === 'string' || typeof value === 'number' ? value : 'No data';
  }

  return (
    <View style={{ alignItems: 'center', marginRight: 16 }}>
      <Text style={{ fontSize: 20 }}>{displayValue}</Text>
      <Text style={{ fontSize: 12, color: '#666' }}>{label}</Text>
    </View>
  );
}