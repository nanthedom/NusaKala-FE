// app/creator/[creatorId]/page.tsx
import CreatorProfilePage from "../../../components/features/creator/CreatorProfilePage";

interface PageProps {
  params: {
    creatorId: string;
  };
}

export default function CreatorProfile({ params }: PageProps) {
  return <CreatorProfilePage creatorId={params.creatorId} />;
}

export async function generateStaticParams() {
  // Generate static params for known creators
  return [
    { creatorId: 'wayang' },
    // Add more creator IDs as needed
  ];
}