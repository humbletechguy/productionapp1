// navigation/RootNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import the newly created MainTabs
import MainTabs from './MainTabs';

import AddIngredient from '../screens/AddIngredient';
import AddRecipe from '../screens/AddRecipe';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* The tab navigator as the primary (main) route */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Additional stack screens for deeper or modal routes */}
        <Stack.Screen name="AddIngredient" component={AddIngredient} />
        <Stack.Screen name="AddRecipe" component={AddRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}