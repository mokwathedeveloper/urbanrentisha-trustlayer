import { RequestViewingPage } from "@/components/request-viewing/request-viewing-page";

type PageProps = {
  params: {
    propertyId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <RequestViewingPage propertyId={params.propertyId} />;
}
