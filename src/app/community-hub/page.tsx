'use client'

import { useRouter } from 'next/navigation'
import communityData from './data/communityData.json'

export default function CommunityHubPage() {
  const router = useRouter()

  const categories = Object.entries(communityData).map(([id, data]) => ({
    id,
    ...data,
  }))

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/community-hub/${categoryId}`)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-nusa-darkBrown mb-4">
            COMMUNITY
          </h1>
          <p className="text-base md:text-lg text-nusa-brown max-w-2xl mx-auto">
            Explore people, events, and posts from these cultural categories
          </p>
        </div>

        {/* Grid Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 max-w-6xl mx-auto justify-items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center justify-start cursor-pointer transition-transform hover:scale-105 group text-center"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-white/10 backdrop-blur-md border shadow-md rounded-full group-hover:shadow-lg transition-all duration-300">
                <img
                  src={category.icon}
                  alt={category.title}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="mt-3 min-h-[56px] flex flex-col justify-center items-center">
                <h3 className="font-semibold text-sm text-nusa-gold leading-tight">
                  {category.title}
                </h3>
                <p className="text-xs text-nusa-bronze leading-relaxed mt-1 max-w-[8rem] sm:max-w-[10rem]">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
