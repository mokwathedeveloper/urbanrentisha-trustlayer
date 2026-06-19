import { PropertyDetailPage } from "@/components/property-detail/property-detail-page";

type PageProps = { params: { id: string } };

export default function Page({ params }: PageProps) {
  return <PropertyDetailPage propertyId={params.id} />;
}
