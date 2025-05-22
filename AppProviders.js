// AppProviders.js
import { CartProvider } from './context/CartContext';
import { InventoryProvider } from './context/InventoryContext';
import { ProductProvider } from './context/ProductContext';
import { RecipeProvider } from './context/RecipeContext';
import { StatsProvider } from './context/StatsContext';

export function AppProviders({ children }) {
  return (
    <CartProvider>
      <InventoryProvider>
        <ProductProvider>
          <RecipeProvider>
            <StatsProvider>
              {children}
            </StatsProvider>
          </RecipeProvider>
        </ProductProvider>
      </InventoryProvider>
    </CartProvider>
  );
}