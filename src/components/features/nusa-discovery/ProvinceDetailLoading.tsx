import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProvinceDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-yellow-50">
      {/* Header Loading */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <Skeleton className="h-16 w-96 mx-auto" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
            <div className="flex justify-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Loading */}
      <div className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-8">
          {/* Loading cards for cultural sections */}
          {Array.from({ length: 9 }).map((_, index) => (
            <Card key={index} className="border-orange-200/50 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-64" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-24 w-full" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Loading animation overlay */}
      <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-orange-900">Loading Cultural Heritage</h3>
            <p className="text-orange-700">Gathering rich cultural information...</p>
          </div>
        </div>
      </div>
    </div>
  );
}