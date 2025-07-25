"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Users, Calendar, ExternalLink } from "lucide-react";

interface CreatorProfileProps {
  creatorId: string;
}

// Mock data - replace with actual data fetching
const mockCreatorData = {
  wayang: {
    id: "wayang",
    name: "Wayang Masterpiece",
    profileImage: "/default-avatar.svg",
    location: "Yogyakarta, Indonesia",
    joinDate: "March 2023",
    communities: ["Traditional Arts", "Cultural Heritage", "Performing Arts"],
    description: "Passionate wayang kulit performer and cultural preservationist. Dedicated to sharing the beauty of Indonesian shadow puppetry with the world. Follow my journey: @wayangmaster | wayangarts.com",
    posts: [
      { id: 1, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 2, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 3, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 4, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 5, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 6, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 7, image: "/not-found-picture-post.svg", type: "photo" },
      { id: 8, image: "/not-found-picture-post.svg", type: "photo" },
    ],
    mentions: [
      { id: 1, content: "Amazing wayang performance last night!", author: "culturelover", date: "2 days ago" },
      { id: 2, content: "The storytelling was incredible", author: "artfan23", date: "1 week ago" },
    ]
  }
};

export default function CreatorProfilePage({ creatorId }: CreatorProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'description' | 'post' | 'mentions'>('description');
  
  const creator = mockCreatorData[creatorId as keyof typeof mockCreatorData];
  
  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-nusa-darkBrown mb-4">Creator not found</h2>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-nusa-gold text-white rounded-lg hover:bg-nusa-darkGold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDescription = (text: string) => {
    // Simple link detection and formatting
    return text.split(' ').map((word, index) => {
      if (word.startsWith('@')) {
        return (
          <span key={index} className="text-nusa-gold hover:underline cursor-pointer">
            {word}{' '}
          </span>
        );
      } else if (word.includes('.com') || word.includes('.id') || word.includes('http')) {
        return (
          <a 
            key={index} 
            href={word.startsWith('http') ? word : `https://${word}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-nusa-gold hover:underline inline-flex items-center gap-1"
          >
            {word} <ExternalLink size={12} />
          </a>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nusa-cream via-nusa-lightGold to-nusa-cream">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-nusa-brown hover:text-nusa-darkBrown transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="p-8 text-center border-b border-nusa-lightGold/30">
              <div className="relative inline-block mb-4">
                <img
                  src={creator.profileImage}
                  alt={creator.name}
                  className="w-24 h-24 rounded-full border-4 border-nusa-gold/50 shadow-lg object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-nusa-darkBrown mb-2">{creator.name}</h1>
              
              {/* Profile Stats */}
              <div className="flex justify-center gap-6 text-sm text-nusa-brown">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{creator.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Joined {creator.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-nusa-lightGold/30">
              {[
                { key: 'description', label: 'DESCRIPTION' },
                { key: 'post', label: 'POST' },
                { key: 'mentions', label: 'MENTIONS' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                    activeTab === tab.key
                      ? 'text-nusa-darkBrown'
                      : 'text-nusa-brown hover:text-nusa-darkBrown'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nusa-gold"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  {/* Communities */}
                  <div>
                    <h3 className="font-semibold text-nusa-darkBrown mb-3 flex items-center gap-2">
                      <Users size={18} />
                      Communities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {creator.communities.map((community, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-nusa-lightGold/50 text-nusa-brown text-sm rounded-full"
                        >
                          {community}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-nusa-darkBrown mb-3">About</h3>
                    <p className="text-nusa-brown leading-relaxed">
                      {formatDescription(creator.description)}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'post' && (
                <div>
                  <div className="grid grid-cols-3 gap-1">
                    {creator.posts.map((post) => (
                      <div
                        key={post.id}
                        className="aspect-square bg-nusa-lightGold/20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={post.image}
                          alt={`Post ${post.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {creator.posts.length === 0 && (
                    <div className="text-center py-12 text-nusa-brown">
                      <p>No posts yet</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'mentions' && (
                <div className="space-y-4">
                  {creator.mentions.map((mention) => (
                    <div
                      key={mention.id}
                      className="p-4 bg-nusa-lightGold/20 rounded-lg"
                    >
                      <p className="text-nusa-darkBrown mb-2">{mention.content}</p>
                      <div className="flex justify-between text-sm text-nusa-brown">
                        <span>@{mention.author}</span>
                        <span>{mention.date}</span>
                      </div>
                    </div>
                  ))}
                  {creator.mentions.length === 0 && (
                    <div className="text-center py-12 text-nusa-brown">
                      <p>No mentions yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}