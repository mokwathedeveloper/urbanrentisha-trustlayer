import { FakeListingReportPage } from "@/components/fake-listing-report/fake-listing-report-page";

type PageProps = {
  params: {
    listingId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <FakeListingReportPage listingId={params.listingId} />;
}
