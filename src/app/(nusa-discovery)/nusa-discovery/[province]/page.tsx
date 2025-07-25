import { Suspense } from 'react';
import { ProvinceDetailContent } from '@/components/features/nusa-discovery/ProvinceDetailContent';
import { ProvinceDetailLoading } from '@/components/features/nusa-discovery/ProvinceDetailLoading';
import { ProvinceDetailParams } from '@/types/province.types';

interface ProvinceDetailPageProps {
  params: ProvinceDetailParams;
}

export async function generateMetadata({ params }: ProvinceDetailPageProps) {
  const provinceName = decodeURIComponent(params.province)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${provinceName} - Cultural Heritage | NusaKala`,
    description: `Discover the rich cultural heritage of ${provinceName}, Indonesia. Explore traditional arts, music, cuisine, architecture, and more.`,
    keywords: `${provinceName}, Indonesia culture, traditional arts, heritage, cultural tourism`,
  };
}

export default function ProvinceDetailPage({ params }: ProvinceDetailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50">
      <Suspense fallback={<ProvinceDetailLoading />}>
        <ProvinceDetailContent province={params.province} />
      </Suspense>
    </div>
  );
}