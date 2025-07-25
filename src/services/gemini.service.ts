import { ProvinceCulturalData, ApiResponse } from '@/types/province.types';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export class GeminiService {
  private static instance: GeminiService;

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private createPrompt(provinceName: string): string {
    return `
Generate comprehensive cultural information about ${provinceName}, Indonesia in JSON format. Please provide detailed information for each category below. Return ONLY valid JSON without any markdown formatting or code blocks.

Structure the response exactly as follows:

{
  "province_name": "${provinceName}",
  "visual_arts_crafts": {
    "title": "Visual Arts & Crafts of ${provinceName}",
    "description": "Detailed description of visual arts and traditional crafts",
    "notable_examples": ["craft1", "craft2", "craft3"],
    "cultural_significance": "Cultural and historical significance"
  },
  "traditional_music": {
    "title": "Traditional Music of ${provinceName}",
    "description": "Overview of traditional music heritage",
    "instruments": ["instrument1", "instrument2"],
    "notable_genres": ["genre1", "genre2"],
    "cultural_context": "Cultural context and occasions"
  },
  "art_performance": {
    "title": "Art Performance of ${provinceName}",
    "description": "Traditional performing arts overview",
    "dance_forms": ["dance1", "dance2"],
    "theater_forms": ["theater1", "theater2"],
    "cultural_occasions": ["occasion1", "occasion2"]
  },
  "customs_ceremonial": {
    "title": "Customs & Ceremonial of ${provinceName}",
    "description": "Traditional customs and ceremonial practices",
    "major_ceremonies": ["ceremony1", "ceremony2"],
    "life_cycle_rituals": ["ritual1", "ritual2"],
    "seasonal_celebrations": ["celebration1", "celebration2"]
  },
  "traditional_architecture": {
    "title": "Traditional Architecture of ${provinceName}",
    "description": "Architectural heritage and building styles",
    "house_styles": ["style1", "style2"],
    "construction_materials": ["material1", "material2"],
    "architectural_features": ["feature1", "feature2"]
  },
  "traditional_clothing": {
    "title": "Traditional Clothing of ${provinceName}",
    "description": "Traditional clothing and textile heritage",
    "mens_attire": ["attire1", "attire2"],
    "womens_attire": ["attire1", "attire2"],
    "ceremonial_wear": ["wear1", "wear2"],
    "textiles_patterns": ["pattern1", "pattern2"]
  },
  "traditional_cuisine": {
    "title": "Traditional Cuisine of ${provinceName}",
    "description": "Culinary heritage and food culture",
    "signature_dishes": ["dish1", "dish2", "dish3"],
    "cooking_methods": ["method1", "method2"],
    "local_ingredients": ["ingredient1", "ingredient2"],
    "food_culture": "Food culture and dining customs"
  },
  "regional_literature": {
    "title": "Regional Literature of ${provinceName}",
    "description": "Literary heritage and oral traditions",
    "oral_traditions": ["tradition1", "tradition2"],
    "written_works": ["work1", "work2"],
    "literary_forms": ["form1", "form2"],
    "cultural_themes": ["theme1", "theme2"]
  },
  "destination": {
    "title": "Cultural Destinations in ${provinceName}",
    "description": "Must-visit cultural and historical destinations",
    "cultural_sites": ["site1", "site2", "site3"],
    "historical_landmarks": ["landmark1", "landmark2"],
    "natural_attractions": ["attraction1", "attraction2"],
    "recommended_experiences": ["experience1", "experience2"]
  }
}

Please ensure all information is accurate, culturally respectful, and represents the authentic heritage of ${provinceName}, Indonesia.
    `;
  }

  public async getProvinceCulturalData(provinceName: string): Promise<ApiResponse<ProvinceCulturalData>> {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
      }

      const prompt = this.createPrompt(provinceName);

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Gemini API Error Response:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
        console.error('Invalid Gemini response structure:', result);
        throw new Error('Invalid response from Gemini API');
      }

      const generatedText = result.candidates[0].content.parts[0].text;
      
      // Clean the response to extract JSON
      let cleanText = generatedText.trim();
      
      // Remove markdown code blocks if present
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```\s*/, '').replace(/```\s*$/, '');
      }

      try {
        const parsedData: ProvinceCulturalData = JSON.parse(cleanText);
        
        // Validate the structure
        if (!parsedData.province_name || !parsedData.visual_arts_crafts) {
          throw new Error('Invalid data structure received from API');
        }

        return {
          success: true,
          data: parsedData
        };
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Raw response:', cleanText);
        throw new Error('Failed to parse response as JSON');
      }

    } catch (error) {
      console.error('Gemini Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Cache implementation for better performance
  private cache = new Map<string, { data: ProvinceCulturalData; timestamp: number }>();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  public async getCachedProvinceCulturalData(provinceName: string): Promise<ApiResponse<ProvinceCulturalData>> {
    const cacheKey = provinceName.toLowerCase();
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return {
        success: true,
        data: cached.data
      };
    }

    const result = await this.getProvinceCulturalData(provinceName);
    
    if (result.success && result.data) {
      this.cache.set(cacheKey, {
        data: result.data,
        timestamp: Date.now()
      });
    }

    return result;
  }
}