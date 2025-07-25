// app/creator/[creatorId]/page.tsx
import CreatorProfilePage from "../../../components/features/creator/CreatorProfilePage";

interface PageProps {
  params: Promise<{
    creatorId: string;
  }>;
}

export default async function CreatorProfile({ params }: PageProps) {
  const resolvedParams = await params;
  return <CreatorProfilePage creatorId={resolvedParams.creatorId} />;
}

export async function generateStaticParams() {
  // Generate static params for known creators
  return [
    { creatorId: 'wayang' },
    // Add more creator IDs as needed
  ];
}