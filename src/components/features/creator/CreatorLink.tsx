"use client";

import { useRouter } from "next/navigation";

interface CreatorLinkProps {
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  className?: string;
  showAvatar?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent) => void;
}

export default function CreatorLink({
  creatorId,
  creatorName,
  creatorAvatar,
  className = "",
  showAvatar = true,
  size = 'md',
  onClick
}: CreatorLinkProps) {
  const router = useRouter();

  const sizeClasses = {
    sm: "text-xs gap-2",
    md: "text-sm gap-3", 
    lg: "text-base gap-4"
  };

  const avatarSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onClick) {
      onClick(e);
    } else {
      router.push(`/creator/${creatorId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center hover:bg-nusa-lightGold/20 p-2 rounded-lg transition-colors cursor-pointer ${sizeClasses[size]} ${className}`}
    >
      {showAvatar && creatorAvatar && (
        <img
          src={creatorAvatar}
          alt={creatorName}
          className={`${avatarSizes[size]} rounded-full object-cover border border-nusa-lightGold/30`}
        />
      )}
      <span className="text-nusa-brown hover:text-nusa-gold transition-colors font-medium line-clamp-1">
        {creatorName}
      </span>
    </div>
  );
}

interface WithCreatorLinkProps {
  creatorId: string;
  children: React.ReactNode;
  className?: string;
}

export function WithCreatorLink({ creatorId, children, className = "" }: WithCreatorLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/creator/${creatorId}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
    >
      {children}
    </div>
  );
}