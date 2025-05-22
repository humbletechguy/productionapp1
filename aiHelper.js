// utils/aiHelper.js
// This handles AI-based OCR + shipping breakdown logic by weight/cost.
export async function parseReceiptWithAI(receiptImage) {
  // In real code, you'd do OCR + GPT-based parsing.
  // This stub simulates returning an array with shipping shares.
  return [
    { 
      name: 'Sample AI Ingredient', 
      quantity: 10, 
      unit: 'lbs', 
      price: 8,   // base price
      shippingShare: 2, 
      vendor: 'newaromaticscanada.ca'
    }
  ];
}