"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Palette, 
  Music, 
  Theater, 
  Users, 
  Building, 
  Shirt, 
  ChefHat, 
  BookOpen, 
  MapPin,
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { GeminiService } from '@/services/gemini.service';
import { ProvinceCulturalData } from '@/types/province.types';
import { ProvinceDetailLoading } from './ProvinceDetailLoading';

interface ProvinceDetailContentProps {
  province: string;
}

export function ProvinceDetailContent({ province }: ProvinceDetailContentProps) {
  const router = useRouter();
  const [data, setData] = useState<ProvinceCulturalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert URL parameter to readable name
  const provinceName = decodeURIComponent(province)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const geminiService = GeminiService.getInstance();
      const result = await geminiService.getCachedProvinceCulturalData(provinceName);
      
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to load cultural data');
      }
    } catch (err) {
      setError('An unexpected error occurred while loading data');
      console.error('Province detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [provinceName]);

  if (loading) {
    return <ProvinceDetailLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 border-red-200">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Button 
                onClick={loadData}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.back()}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const culturalSections = [
    {
      id: 'visual_arts_crafts',
      icon: Palette,
      title: data.visual_arts_crafts.title,
      description: data.visual_arts_crafts.description,
      items: data.visual_arts_crafts.notable_examples,
      extra: data.visual_arts_crafts.cultural_significance,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'traditional_music',
      icon: Music,
      title: data.traditional_music.title,
      description: data.traditional_music.description,
      items: data.traditional_music.instruments,
      extra: data.traditional_music.cultural_context,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'art_performance',
      icon: Theater,
      title: data.art_performance.title,
      description: data.art_performance.description,
      items: data.art_performance.dance_forms,
      extra: data.art_performance.cultural_occasions.join(', '),
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'customs_ceremonial',
      icon: Users,
      title: data.customs_ceremonial.title,
      description: data.customs_ceremonial.description,
      items: data.customs_ceremonial.major_ceremonies,
      extra: data.customs_ceremonial.seasonal_celebrations.join(', '),
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'traditional_architecture',
      icon: Building,
      title: data.traditional_architecture.title,
      description: data.traditional_architecture.description,
      items: data.traditional_architecture.house_styles,
      extra: data.traditional_architecture.construction_materials.join(', '),
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'traditional_clothing',
      icon: Shirt,
      title: data.traditional_clothing.title,
      description: data.traditional_clothing.description,
      items: data.traditional_clothing.mens_attire,
      extra: data.traditional_clothing.textiles_patterns.join(', '),
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'traditional_cuisine',
      icon: ChefHat,
      title: data.traditional_cuisine.title,
      description: data.traditional_cuisine.description,
      items: data.traditional_cuisine.signature_dishes,
      extra: data.traditional_cuisine.food_culture,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'regional_literature',
      icon: BookOpen,
      title: data.regional_literature.title,
      description: data.regional_literature.description,
      items: data.regional_literature.oral_traditions,
      extra: data.regional_literature.cultural_themes.join(', '),
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'destination',
      icon: MapPin,
      title: data.destination.title,
      description: data.destination.description,
      items: data.destination.cultural_sites,
      extra: data.destination.recommended_experiences.join(', '),
      color: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <div className="relative py-16 md:py-20 px-2 md:px-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="absolute top-3 left-3 md:top-4 md:left-4 text-white hover:bg-white/20 !px-3 !py-2 md:!px-4 md:!py-2 text-sm md:text-base"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              <span className="hidden xs:inline">Back to Map</span>
              <span className="inline xs:hidden">Back</span>
            </Button>
            
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight break-words">
              Cultural Heritage of {data.province_name}
            </h1>
            <p className="text-base xs:text-lg md:text-2xl text-white/90 max-w-4xl mx-auto">
              Discover the rich traditions, arts, and customs that define {data.province_name}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2 md:pt-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs md:text-base px-2 md:px-3 py-1">
                {culturalSections.length} Cultural Aspects
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs md:text-base px-2 md:px-3 py-1">
                Traditional Heritage
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-2 sm:px-4 py-8 md:py-16">
        <div className="grid gap-8 md:gap-12">
          {culturalSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} className="border-orange-200/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-4 xs:p-6 md:p-8">
                  <div className="space-y-4 md:space-y-6">
                    {/* Section Header */}
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4">
                      <div className={`w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <IconComponent className="h-6 w-6 xs:h-8 xs:w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-orange-900 tracking-tight">
                          {section.title}
                        </h2>
                        <div className="w-12 xs:w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-2"></div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-base xs:text-lg text-orange-800 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Main Items */}
                      <div className="space-y-3 md:space-y-4">
                        <h3 className="text-lg xs:text-xl font-semibold text-orange-900 flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                          Cultural Objects
                        </h3>
                        <ul className="space-y-1.5 xs:space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 xs:gap-3">
                              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-orange-700 text-sm xs:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Extra Information */}
                      <div className="space-y-3 md:space-y-4">
                        <h3 className="text-lg xs:text-xl font-semibold text-orange-900 flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                          Cultural Context
                        </h3>
                        <div className="p-3 xs:p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                          <p className="text-orange-700 leading-relaxed text-sm xs:text-base">
                            {section.extra}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-10 md:mt-16 pt-6 md:pt-8 border-t border-orange-200">
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-orange-900">
              Explore More Indonesian Culture
            </h3>
            <p className="text-orange-700 max-w-2xl mx-auto text-sm xs:text-base">
              Continue your cultural journey by discovering other provinces and their unique heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                onClick={() => router.push('/nusa-discovery')}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
              >
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="hidden xs:inline">Explore Other Provinces</span>
                <span className="inline xs:hidden">Explore</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="hidden xs:inline">Back to Map</span>
                <span className="inline xs:hidden">Back</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}