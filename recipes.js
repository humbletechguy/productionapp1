//components/data/recipes.js
const recipes = [
  {
    id: 'hanging-diffuser',
    name: 'Hanging Diffuser',
    defaultBatchSize: 12,
    unitCost: 2.4,
    salePriceRetail: 18,
    stock: 12,
    variants: [
      { scent: 'Baja Sur', stock: 4, unitCost: 2.4, priceRetail: 18, priceWholesale: 11 },
      { scent: 'Grapefruit Paloma', stock: 4, unitCost: 2.4, priceRetail: 18, priceWholesale: 11 },
      { scent: 'Amalfi Coast', stock: 4, unitCost: 2.4, priceRetail: 18, priceWholesale: 11 }
    ],
    ingredients: [
      { name: 'Diffuser Base', quantityPerBatch: 360, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Base Phase' } },
      { name: 'Polysorbate 20', quantityPerBatch: 24, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Base Phase' } },
      { name: 'Fragrance Oil', quantityPerBatch: 96, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Base Phase' } }
    ],
    instructions: [
      {
        phase: { code: 'phaseA', label: 'Base Phase' },
        text: `1. In a sanitized container, combine diffuser base and fragrance oil.\n2. Add Polysorbate 20 and stir well until the solution is uniform.\n3. Let mixture sit for 30 minutes for full integration.`
      },
      {
        phase: { code: 'finishing', label: 'Finishing' },
        text: `1. Fill hanging diffuser bottles carefully using a small funnel.\n2. Insert wood caps and secure tightly.\n3. Label bottles with scent and batch details.`
      }
    ]
  },
  {
    id: 'diffuser',
    name: 'Reed Diffuser',
    defaultBatchSize: 12,
    unitCost: 2.75,
    salePriceRetail: 20,
    stock: 24,
    variants: [
      { scent: 'Amalfi Coast', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Baja Sur', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Cactus & Sea Salt', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Calamnsi & Papaya', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Cleansing Light', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Garden Party', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Ruffled Linen', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Seaside Mist', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 },
      { scent: 'Sunday Morning', stock: 3, unitCost: 2.75, priceRetail: 20, priceWholesale: 12 }
    ],
    ingredients: [
      { name: 'Diffuser Base', quantityPerBatch: 1000, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Fragrance Oil', quantityPerBatch: 200, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Polysorbate 20', quantityPerBatch: 30, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } }
    ],
    instructions: [
      {
        phase: { code: 'phaseA', label: 'Phase A' },
        text: `1. In a sanitized container, combine diffuser base and fragrance oil.\n2. Add Polysorbate 20 and stir until fully incorporated.\n3. Let sit for 15–30 minutes to ensure blend stability.`
      },
      {
        phase: { code: 'bottling', label: 'Bottling' },
        text: `1. Pour into diffuser bottles using a funnel.\n2. Insert reeds, allow to absorb blend, and flip reeds before sealing.\n3. Label with scent and batch information.`
      }
    ]
  },
  {
    id: 'beard-cream',
    name: 'Hair & Beard Cream',
    defaultBatchSize: 50,
    unitCost: 1.28,
    salePriceRetail: 15,
    stock: 24,
    ingredients: [
      { name: 'Distilled Water', quantityPerBatch: 2523, unit: 'g', available: 1000, phase: { code: 'phaseA', label: 'Water Phase' } },
      { name: 'Aloe Gel', quantityPerBatch: 567.0, unit: 'g', available: 1000, phase: { code: 'phaseA', label: 'Water Phase' } },
      { name: 'Glycerin', quantityPerBatch: 113.4, unit: 'g', available: 1000, phase: { code: 'phaseA', label: 'Water Phase' } },
      { name: 'Arrowroot Powder', quantityPerBatch: 141.8, unit: 'g', available: 1000, phase: { code: 'phaseA', label: 'Water Phase' } },
      { name: 'Kaolin Clay', quantityPerBatch: 85.1, unit: 'g', available: 1000, phase: { code: 'phaseA', label: 'Water Phase' } },
      { name: 'Cocoa Butter', quantityPerBatch: 141.8, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Shea Butter', quantityPerBatch: 283.5, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Mango Butter', quantityPerBatch: 255.2, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Cetyl Alcohol', quantityPerBatch: 226.8, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'BTMS-50', quantityPerBatch: 283.5, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Grapeseed Oil', quantityPerBatch: 170.1, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Jojoba Oil', quantityPerBatch: 340.2, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Squalane', quantityPerBatch: 113.4, unit: 'g', available: 1000, phase: { code: 'phaseB', label: 'Oil Phase' } },
      { name: 'Polyquaternium-7', quantityPerBatch: 113.4, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } },
      { name: 'Dimethicone', quantityPerBatch: 85.1, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } },
      { name: 'Hydrolyzed Oat Protein', quantityPerBatch: 113.4, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } },
      { name: 'Fragrance Oil', quantityPerBatch: 55, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } },
      { name: 'Polysorbate 20', quantityPerBatch: 2.8, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } },
      { name: 'Germall Plus', quantityPerBatch: 28.4, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } }
    ],
    instructions: [
      {
        phase: { code: 'phaseA', label: 'Water Phase' },
        text: `1. In a sanitized container, mix 170g distilled water with 85.1g kaolin clay.
2. Stir well and let hydrate for 10–15 minutes.
3. Mix 141.8g arrowroot powder with 113.4g glycerin until smooth.
4. Combine with hydrated clay and let rest for 5 minutes.
5. In main vessel, combine 2353g distilled water and 567g aloe vera gel.
6. Slowly add slurry while stirring.
7. Heat mixture to 72–75°C.`
      },
      {
        phase: { code: 'phaseB', label: 'Oil Phase' },
        text: `1. In a separate vessel, melt 141.8g cocoa butter at approximately 40°C.
2. Add 283.5g shea butter and 255.2g mango butter.
3. Heat to 60°C.
4. Increase heat to 75°C.
5. Add 283.5g BTMS-50 and 226.8g cetyl alcohol.
6. Stir until fully dissolved.
7. Warm 170.1g grapeseed oil, 340.2g jojoba oil, and 113.4g squalane to 40°C.
8. Slowly add to melted Phase B oils.
9. Pour Phase A (water) into Phase B (oil) slowly at 70–75°C while stirring.
10. Blend with immersion blender for 1–2 minutes.`
      },
      {
        phase: { code: 'coolDown', label: 'Cool Down' },
        text: `1. Cool to 45°C in a water bath while stirring gently.
2. Prepare cool-down ingredients.
3. Premix 55g fragrance oil with 2.8g Polysorbate 20.
4. Add 113.4g Polyquaternium-7, 85.1g Dimethicone, 113.4g Hydrolyzed Oat Protein, and premixed fragrance.
5. Stir to combine.
6. Add 28.4g Germall Plus preservative.
7. Stir until uniform.`
      },
      {
        phase: { code: 'finalWhip', label: 'Final Whipping' },
        text: `1. Cool to 25°C.
2. Whip with motorized whisk for 3–5 minutes.
3. Scrape sides.
4. Form soft, stable peaks.`
      },
      {
        phase: { code: 'finishing', label: 'Finishing' },
        text: `1. Let rest for 30 minutes.
2. Refrigerate if needed.
3. Fill 4oz jars and leave open for 1 hour.
4. Cap and label.`
      }
    ]
  },
  {
    id: 'sea-salt-spray',
    name: 'Sea Salt Spray',
    defaultBatchSize: 36,
    unitCost: 0.95,
    salePriceRetail: 12,
    stock: 10,
    ingredients: [
      { name: 'Fine Sea Salt', quantityPerBatch: 375, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Dead Sea Salt', quantityPerBatch: 188, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Epsom Salt', quantityPerBatch: 75, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Aloe Gel', quantityPerBatch: 1080, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Distilled Water', quantityPerBatch: 2130, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Bentonite Clay', quantityPerBatch: 15, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Glycerin', quantityPerBatch: 97.5, unit: 'g', available: 2000, phase: { code: 'phaseA', label: 'Phase A – Water Phase' } },
      { name: 'Panthenol', quantityPerBatch: 64.5, unit: 'g', available: 2000, phase: { code: 'coolDown', label: 'Cooling Phase' } },
      { name: 'Polyquaternium-7', quantityPerBatch: 32.4, unit: 'g', available: 2000, phase: { code: 'coolDown', label: 'Cooling Phase' } },
      { name: 'Jojoba Oil', quantityPerBatch: 54, unit: 'g', available: 2000, phase: { code: 'phaseB', label: 'Phase B – Oil Phase' } },
      { name: 'Essential Oils', quantityPerBatch: 21.6, unit: 'g', available: 2000, phase: { code: 'phaseB', label: 'Phase B – Oil Phase' } },
      { name: 'Polysorbate 80', quantityPerBatch: 97.5, unit: 'g', available: 2000, phase: { code: 'phaseB', label: 'Phase B – Oil Phase' } },
      { name: 'Germall Plus', quantityPerBatch: 15, unit: 'g', available: 2000, phase: { code: 'coolDown', label: 'Cooling Phase' } }
    ],
    instructions: [
      {
        phase: { code: 'prep', label: 'Prep' },
        text: '1. Put on protective gear and sanitize all equipment and work areas.'
      },
      {
        phase: { code: 'phaseA', label: 'Phase A – Water Phase' },
        text: `**Phase A – Water Phase:**

1. In main vessel, combine 1080g Aloe Vera and 2130g Distilled Water.
2. Heat to approximately 50°C.
3. Gradually dissolve 375g Fine Sea Salt, 188g Dead Sea Salt, and 75g Epsom Salt while stirring.
4. Ensure solution is clear.
5. Mix 15g Bentonite Clay with 97.5g Glycerin until smooth slurry forms.
6. Blend slurry into salt solution using immersion blender.
7. Blend for 5–10 minutes until fully hydrated and hazy.
8. Add 64.5g Panthenol and 32.4g Polyquaternium-7.
9. Stir to incorporate.`
      },
      {
        phase: { code: 'phaseB', label: 'Phase B – Oil Phase' },
        text: `**Phase B – Oil Phase:**

1. In a separate beaker, combine 54g Jojoba Oil, 21.6g Essential Oils, and 97.5g Polysorbate 80.
2. Stir until homogeneous.
3. Slowly drizzle oil phase into main vessel while blending.
4. Blend for 3–5 minutes until emulsified and no oil slicks remain.`
      },
      {
        phase: { code: 'coolDown', label: 'Cooling Phase' },
        text: `**Cooling Phase:**

1. Cool batch to 50°C or below.
2. Use water bath to accelerate cooling if needed.
3. Add 15g Germall Plus.
4. Stir or blend on low for 1 minute until uniformly distributed.
5. Perform final homogenization for 2 minutes to ensure full consistency.
6. Product should be uniform with no separation or sediment.`
      },
      {
        phase: { code: 'finishing', label: 'Finishing' },
        text: `1. If needed, filter through fine mesh strainer to remove any particles before bottling.
2. Fill 36 bottles of 120ml each with approximately 120g product, leaving 1–2cm headspace.
3. Insert spray caps, tighten securely, invert and shake gently to prime each bottle.
4. Label bottles with product name, batch number, and date.
5. Store in a cool, dry area away from sunlight.`
      }
    ]
  },
  {
    id: 'beard-oil',
    name: 'Beard Oil',
    defaultBatchSize: 100,
    unitCost: 3.88,
    salePriceRetail: 15,
    stock: 15,
    ingredients: [
      { name: 'Squalene', quantityPerBatch: 100, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } },
      { name: 'Grapeseed Oil', quantityPerBatch: 250, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } },
      { name: 'Argan Oil', quantityPerBatch: 60, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } },
      { name: 'Jojoba Oil', quantityPerBatch: 250, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } },
      { name: 'Sweet Almond Oil', quantityPerBatch: 50, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } },
      { name: 'Apricot Kernel Oil', quantityPerBatch: 60, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } },
      { name: 'Dimethicone', quantityPerBatch: 24, unit: 'g', available: 1000, phase: { code: 'general', label: 'General' } }
    ],
    instructions: [
      {
        phase: { code: 'general', label: 'General' },
        text: `1. Sanitize all equipment, mixing containers, and bottles thoroughly.
2. Weigh all carrier oils: squalene, grapeseed, argan, jojoba, sweet almond, and apricot kernel oils.
3. Combine all carrier oils in mixing vessel and stir gently to blend.
4. Add dimethicone to the blended oils and stir thoroughly to ensure uniform distribution.
5. If fragrance is to be added, incorporate at this stage and mix well.
6. Allow the mixture to rest for 30 minutes to ensure full integration of ingredients.
7. After resting, fill sanitized bottles with the beard oil blend.
8. Seal securely and label.`
      }
    ]
  },
  {
    id: 'perfume',
    name: 'Perfume Spray',
    defaultBatchSize: 1,
    unitCost: 2.25,
    salePriceRetail: 30,
    stock: 6,
    variants: [
      { scent: 'Seaside Mist', stock: 2, unitCost: 2.25, priceRetail: 30, priceWholesale: 18 },
      { scent: 'Baja Sur', stock: 1, unitCost: 2.25, priceRetail: 30, priceWholesale: 18 },
      { scent: 'Santal Coconut', stock: 2, unitCost: 2.25, priceRetail: 30, priceWholesale: 18 },
      { scent: 'Wild Daisy', stock: 1, unitCost: 2.25, priceRetail: 30, priceWholesale: 18 }
    ],
    ingredients: [
      { name: 'Alcohol', quantityPerBatch: 168, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Fragrance Oil', quantityPerBatch: 30, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Glycerin', quantityPerBatch: 5, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } }
    ],
    instructions: [
      {
        phase: { code: 'phaseA', label: 'Phase A' },
        text: `1. Measure out alcohol and fragrance oil and mix together.
2. Add glycerin after mixing fragrance and alcohol.
3. Let cure in larger bottle for 2 weeks.`
      }
    ]
  },
  {
    id: 'facial-mist',
    name: 'Facial Mist',
    defaultBatchSize: 12,
    unitCost: 2.65,
    salePriceRetail: 18,
    stock: 8,
    ingredients: [
      { name: 'Distilled Water', quantityPerBatch: 500, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Rose Water', quantityPerBatch: 350, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Aloe Water', quantityPerBatch: 200, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Oat Protein', quantityPerBatch: 20, unit: 'ml', available: 1000, phase: { code: 'phaseA', label: 'Phase A' } },
      { name: 'Baja F.O', quantityPerBatch: 2, unit: 'ml', available: 1000, phase: { code: 'phaseB', label: 'Phase B' } },
      { name: 'Polysorbate 20', quantityPerBatch: 2, unit: 'ml', available: 1000, phase: { code: 'phaseB', label: 'Phase B' } },
      { name: 'Germall Plus', quantityPerBatch: 6, unit: 'ml', available: 1000, phase: { code: 'phaseC', label: 'Phase C' } },
      { name: 'Red Color', quantityPerBatch: 0.1, unit: 'ml', available: 1000, phase: { code: 'phaseC', label: 'Phase C' } }
    ],
    instructions: [
      {
        phase: { code: 'phaseA', label: 'Phase A' },
        text: '1. Measure out distilled water, rose water, aloe water, and oat protein and mix together.'
      },
      {
        phase: { code: 'phaseB', label: 'Phase B' },
        text: '1. In a separate container, mix together Baja F.O and polysorbate 20.'
      },
      {
        phase: { code: 'phaseC', label: 'Phase C' },
        text: '1. Once mixed, add Germall Plus preservative.'
      },
      {
        phase: { code: 'final', label: 'Final' },
        text: '1. Add all components together and mix thoroughly.\n2. Add red color a very small amount at a time to achieve a light rose color.'
      }
    ]
  },
  {
    id: 'soy-candle',
    name: 'Candles',
    category: 'Candle',
    defaultBatchSize: 12,
    unitCost: 2.5,
    salePriceRetail: 18,
    stock: 48,
    variants: [
      { scent: 'Baja Sur', stock: 6, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Amalfi Coast', stock: 4, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Cleansing Light', stock: 5, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Seaside Mist', stock: 5, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Sunday Morning', stock: 5, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Ruffled Linen', stock: 6, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Tobacco & Caramel', stock: 4, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Kindred Spirit', stock: 4, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Raspberry Cordial', stock: 3, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Black Pepper & Birch', stock: 3, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 },
      { scent: 'Golden Clay', stock: 3, unitCost: 2.5, priceRetail: 18, priceWholesale: 10 }
    ],
    ingredients: [
      { name: 'Wax', quantityPerBatch: 1200, unit: 'g', available: 5000, phase: { code: 'phaseA', label: 'Melt Phase' } },
      { name: 'Fragrance Oil', quantityPerBatch: 60, unit: 'g', available: 2000, phase: { code: 'phaseB', label: 'Scent Phase' } },
      { name: 'Polysorbate 20', quantityPerBatch: 3, unit: 'g', available: 2000, phase: { code: 'phaseB', label: 'Scent Phase' } }
    ],
    instructions: [
      {
        phase: { code: 'phaseA', label: 'Melt Phase' },
        text: `1. Melt wax in a double boiler until fully liquid.`
      },
      {
        phase: { code: 'phaseB', label: 'Scent Phase' },
        text: `1. Fill jug with melted wax.
2. Add fragrance oil and Polysorbate 20.
3. Stir gently until fully blended.`
      },
      {
        phase: { code: 'pouring', label: 'Pouring' },
        text: `1. Pour mixture into candle vessels.
2. Let cool and cure fully before trimming wicks and labeling.`
      }
    ]
  },
  {
    id: 'almond-honey-bath-milk',
    name: 'Almond and Honey Bath Milk',
    defaultBatchSize: 20,
    unitCost: 1.85,
    salePriceRetail: 14,
    stock: 10,
    ingredients: [
      { name: 'Goat Milk Powder', quantityPerBatch: 800, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Colloidal Oatmeal', quantityPerBatch: 400, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Baking Soda', quantityPerBatch: 300, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Honey Powder', quantityPerBatch: 250, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Arrowroot Powder', quantityPerBatch: 100, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Almond Oil', quantityPerBatch: 150, unit: 'ml', available: 1000, phase: { code: 'oil', label: 'Oil Phase' } },
      { name: 'Sweet Almond Fragrance', quantityPerBatch: 20, unit: 'g', available: 1000, phase: { code: 'scent', label: 'Scent Phase' } },
      { name: 'Polysorbate 80', quantityPerBatch: 20, unit: 'g', available: 1000, phase: { code: 'scent', label: 'Scent Phase' } },
      { name: 'Vitamin E', quantityPerBatch: 5, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } }
    ],
    instructions: [
      {
        phase: { code: 'dry', label: 'Dry Phase' },
        text: `1. In a large mixing bowl, sift together goat milk powder, colloidal oatmeal, baking soda, and honey powder.\n2. Stir in arrowroot powder until well blended.`
      },
      {
        phase: { code: 'oil', label: 'Oil Phase' },
        text: `1. In a small beaker, mix almond oil with fragrance oil and Polysorbate 80.\n2. Slowly drizzle the scented oil blend into the dry mix while stirring.`
      },
      {
        phase: { code: 'coolDown', label: 'Cool Down' },
        text: `1. Add vitamin E (optional) and stir thoroughly until mixture is uniform.`
      },
      {
        phase: { code: 'packaging', label: 'Packaging' },
        text: `1. Spoon the mixture into sanitized 8oz jars.\n2. Tap jars gently to settle contents.\n3. Cap tightly and label each jar with batch info.`
      }
    ]
  },
  {
    id: 'flower-bath',
    name: 'Flower Bath',
    defaultBatchSize: 20,
    unitCost: 1.1,
    salePriceRetail: 16,
    stock: 10,
    ingredients: [
      { name: 'Dried Rose Petals', quantityPerBatch: 200, unit: 'g', available: 1000, phase: { code: 'main', label: 'Main Blend' } },
      { name: 'Dried Lavender Buds', quantityPerBatch: 150, unit: 'g', available: 1000, phase: { code: 'main', label: 'Main Blend' } },
      { name: 'Dried Chamomile Flowers', quantityPerBatch: 100, unit: 'g', available: 1000, phase: { code: 'main', label: 'Main Blend' } },
      { name: 'Calendula Petals', quantityPerBatch: 100, unit: 'g', available: 1000, phase: { code: 'main', label: 'Main Blend' } },
      { name: 'Essential Oil Blend', quantityPerBatch: 10, unit: 'g', available: 1000, phase: { code: 'optional', label: 'Optional' } }
    ],
    instructions: [
      {
        phase: { code: 'main', label: 'Main Blend' },
        text: `1. In a sanitized mixing bowl, gently combine rose petals, lavender buds, chamomile, and calendula petals.\n2. Stir by hand or with a large spoon until evenly mixed.`
      },
      {
        phase: { code: 'optional', label: 'Optional' },
        text: `1. If adding fragrance, lightly mist or drop essential oil blend over petals.\n2. Toss gently to distribute evenly.`
      },
      {
        phase: { code: 'packaging', label: 'Packaging' },
        text: `1. Spoon dried blend into sanitized 8oz jars.\n2. Tap gently to settle.\n3. Cap tightly and label with scent and batch info.`
      }
    ]
  },
  {
    id: 'wildflower-coconut-bath-milk',
    name: 'Wildflower Coconut Bath Milk',
    defaultBatchSize: 20,
    unitCost: 1.95,
    salePriceRetail: 15,
    stock: 10,
    ingredients: [
      { name: 'Coconut Milk Powder', quantityPerBatch: 800, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Dried Wildflowers', quantityPerBatch: 150, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Colloidal Oatmeal', quantityPerBatch: 300, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Baking Soda', quantityPerBatch: 250, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Arrowroot Powder', quantityPerBatch: 100, unit: 'g', available: 1000, phase: { code: 'dry', label: 'Dry Phase' } },
      { name: 'Jojoba Oil', quantityPerBatch: 100, unit: 'ml', available: 1000, phase: { code: 'oil', label: 'Oil Phase' } },
      { name: 'Coconut Fragrance', quantityPerBatch: 20, unit: 'g', available: 1000, phase: { code: 'scent', label: 'Scent Phase' } },
      { name: 'Polysorbate 80', quantityPerBatch: 20, unit: 'g', available: 1000, phase: { code: 'scent', label: 'Scent Phase' } },
      { name: 'Vitamin E', quantityPerBatch: 5, unit: 'g', available: 1000, phase: { code: 'coolDown', label: 'Cool Down' } }
    ],
    instructions: [
      {
        phase: { code: 'dry', label: 'Dry Phase' },
        text: `1. In a large mixing bowl, sift together coconut milk powder, colloidal oatmeal, baking soda, and arrowroot powder.\n2. Stir in dried wildflowers until well combined.`
      },
      {
        phase: { code: 'oil', label: 'Oil Phase' },
        text: `1. Mix jojoba oil with fragrance oil and Polysorbate 80.\n2. Slowly drizzle oil blend into dry mixture, stirring as you go.`
      },
      {
        phase: { code: 'coolDown', label: 'Cool Down' },
        text: `1. Add vitamin E and gently stir to blend into final mixture.`
      },
      {
        phase: { code: 'packaging', label: 'Packaging' },
        text: `1. Spoon blend into 8oz jars.\n2. Tap to settle, cap securely, and label each jar.`
      }
    ]
  },
  {
    id: 'baja-sur-bath-salt',
    name: 'Baja Sur Bath Salt',
    defaultBatchSize: 20,
    unitCost: 1.25,
    salePriceRetail: 14,
    stock: 10,
    ingredients: [
      { name: 'Epsom Salt', quantityPerBatch: 800, unit: 'g', available: 1000, phase: { code: 'base', label: 'Base Salt' } },
      { name: 'Dead Sea Salt', quantityPerBatch: 600, unit: 'g', available: 1000, phase: { code: 'base', label: 'Base Salt' } },
      { name: 'Pink Himalayan Salt', quantityPerBatch: 300, unit: 'g', available: 1000, phase: { code: 'base', label: 'Base Salt' } },
      { name: 'Fragrance Oil – Baja Sur', quantityPerBatch: 30, unit: 'g', available: 1000, phase: { code: 'scent', label: 'Scent Phase' } },
      { name: 'Polysorbate 80', quantityPerBatch: 15, unit: 'g', available: 1000, phase: { code: 'scent', label: 'Scent Phase' } },
      { name: 'Dried Botanicals (optional)', quantityPerBatch: 10, unit: 'g', available: 1000, phase: { code: 'botanicals', label: 'Botanicals' } }
    ],
    instructions: [
      {
        phase: { code: 'base', label: 'Base Salt' },
        text: `1. In a large bowl, mix Epsom Salt, Dead Sea Salt, and Pink Himalayan Salt thoroughly.`
      },
      {
        phase: { code: 'scent', label: 'Scent Phase' },
        text: `1. Blend Baja Sur fragrance oil with Polysorbate 80.\n2. Drizzle over salts and mix thoroughly until evenly distributed.`
      },
      {
        phase: { code: 'botanicals', label: 'Botanicals' },
        text: `1. If desired, stir in dried botanicals.\n2. Ensure even distribution.`
      },
      {
        phase: { code: 'packaging', label: 'Packaging' },
        text: `1. Scoop bath salt mixture into 8oz jars or pouches.\n2. Tap gently to settle.\n3. Seal and label with scent and batch number.`
      }
    ]
  }
];


module.exports = recipes;