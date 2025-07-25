"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import communityData from "../data/communityData.json";
import { ArrowLeft, Heart, MoreHorizontal, Share2 } from "lucide-react";
import CreatorLink from "@/components/features/creator/CreatorLink";

export default function CommunityCategoryPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const category = communityData[categoryId as keyof typeof communityData];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  if (!category) {
    return (
      <div className="p-10 text-center text-gray-600">Category not found.</div>
    );
  }

  const currentPost = category.posts[currentIndex];

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[url('/backgrounds/batik-light.png')] bg-cover bg-center text-gray-800">
      {/* Header */}
      <div className="container mx-auto px-6 pt-10 pb-6 flex items-center gap-4">
        <button
          onClick={() => router.push("/community-hub")}
          className="p-2 rounded-full hover:bg-orange-100 transition"
        >
          <ArrowLeft className="w-6 h-6 text-orange-800" />
        </button>
        <div className="flex items-center gap-4">
          <img
            src={category.icon}
            alt="icon"
            className="w-10 h-10 object-contain hidden md:block"
          />

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{category.title}</h1>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Post */}
        <div className="lg:col-span-2 space-y-6">
          {currentPost && currentPost.user ? (
            <div className="bg-white/60 backdrop-blur-md border border-orange-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreatorLink
                  creatorId={currentPost.user.name.toLowerCase()} // disamakan dengan ID yang kamu pakai, misalnya: 'wayang'
                  creatorName={currentPost.user.name}
                  creatorAvatar={currentPost.user.avatar}
                  size="md"
                />
                <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <span>{currentPost.timeAgo}</span>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img
                  src={currentPost.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mb-4 text-gray-700">{currentPost.content}</p>

              <div className="flex items-center justify-between border-t pt-4">
                <button
                  onClick={() => handleLike(currentPost.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition ${
                    likedPosts.has(currentPost.id)
                      ? "bg-red-100 text-red-600"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPosts.has(currentPost.id) ? "fill-current" : ""
                    }`}
                  />
                  <span>
                    {currentPost.likes +
                      (likedPosts.has(currentPost.id) ? 1 : 0)}
                  </span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-md border border-orange-200 rounded-xl p-6 text-center text-gray-500">
              <p className="text-xl font-semibold">Post not found</p>
              <p className="text-sm mt-2">
                Saat ini belum ada konten dalam kategori ini.
              </p>
            </div>
          )}

          {/* Thumbnails */}
          {category.posts.length > 1 && (
            <div className="flex gap-3">
              {category.posts.map((post, i) => (
                <div
                  key={post.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-lg overflow-hidden cursor-pointer w-1/4 border-2 ${
                    i === currentIndex
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={post.image}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: People */}
        <div className="bg-white/60 backdrop-blur-md border border-orange-200 rounded-xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Explore People</h2>
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {category.members.map((member, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 hover:bg-white/50 rounded-lg"
              >
                <img
                  src={member.avatar}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-600">
                    Joined {member.joinDate} | {member.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
