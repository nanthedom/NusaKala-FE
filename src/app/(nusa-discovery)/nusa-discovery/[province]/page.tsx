import { Suspense } from 'react';
import { ProvinceDetailContent } from '@/components/features/nusa-discovery/ProvinceDetailContent';
import { ProvinceDetailLoading } from '@/components/features/nusa-discovery/ProvinceDetailLoading';

type Props = {
  params: {
    province: string;
  };
};

export async function generateMetadata({ params }: Props) {
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

export default function ProvinceDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50 w-full">
      <div className="w-full max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4">
        <Suspense fallback={<ProvinceDetailLoading />}>
          <ProvinceDetailContent province={params.province} />
        </Suspense>
      </div>
    </div>
  );
}