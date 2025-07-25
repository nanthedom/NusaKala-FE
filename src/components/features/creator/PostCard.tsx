/* eslint-disable @next/next/no-img-element */
"use client";

import CreatorLink, { WithCreatorLink } from "./CreatorLink";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string;
    image: string;
    title: string;
    description?: string;
    likes?: number;
    comments?: number;
    timestamp?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Creator Header */}
      <div className="p-4 border-b border-nusa-lightGold/20">
        <CreatorLink
          creatorId={post.creatorId}
          creatorName={post.creatorName}
          creatorAvatar={post.creatorAvatar}
          size="md"
        />
        {post.timestamp && (
          <p className="text-xs text-nusa-brown/60 mt-1 ml-11">
            {post.timestamp}
          </p>
        )}
      </div>

      {/* Post Image - also clickable to creator profile */}
      <WithCreatorLink creatorId={post.creatorId}>
        <div className="aspect-square overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </WithCreatorLink>

      {/* Post Content */}
      <div className="p-4">
        <h3 className="font-semibold text-nusa-darkBrown mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        {post.description && (
          <p className="text-sm text-nusa-brown mb-3 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-nusa-lightGold/20">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-nusa-brown hover:text-red-500 transition-colors">
              <Heart size={18} />
              <span className="text-sm">{post.likes || 0}</span>
            </button>
            
            <button className="flex items-center gap-1 text-nusa-brown hover:text-nusa-gold transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">{post.comments || 0}</span>
            </button>
          </div>

          <button className="text-nusa-brown hover:text-nusa-gold transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}


export function PostGrid({ posts }: { posts: PostCardProps['post'][] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}