export interface ProvinceCulturalData {
  province_name: string;
  visual_arts_crafts: {
    title: string;
    description: string;
    notable_examples: string[];
    cultural_significance: string;
  };
  traditional_music: {
    title: string;
    description: string;
    instruments: string[];
    notable_genres: string[];
    cultural_context: string;
  };
  art_performance: {
    title: string;
    description: string;
    dance_forms: string[];
    theater_forms: string[];
    cultural_occasions: string[];
  };
  customs_ceremonial: {
    title: string;
    description: string;
    major_ceremonies: string[];
    life_cycle_rituals: string[];
    seasonal_celebrations: string[];
  };
  traditional_architecture: {
    title: string;
    description: string;
    house_styles: string[];
    construction_materials: string[];
    architectural_features: string[];
  };
  traditional_clothing: {
    title: string;
    description: string;
    mens_attire: string[];
    womens_attire: string[];
    ceremonial_wear: string[];
    textiles_patterns: string[];
  };
  traditional_cuisine: {
    title: string;
    description: string;
    signature_dishes: string[];
    cooking_methods: string[];
    local_ingredients: string[];
    food_culture: string;
  };
  regional_literature: {
    title: string;
    description: string;
    oral_traditions: string[];
    written_works: string[];
    literary_forms: string[];
    cultural_themes: string[];
  };
  destination: {
    title: string;
    description: string;
    cultural_sites: string[];
    historical_landmarks: string[];
    natural_attractions: string[];
    recommended_experiences: string[];
  };
}

export interface ProvinceDetailParams {
  province: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}