import { ViewingCodeSuccessPage } from "@/components/viewing-code/viewing-code-success-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ViewingCodeSuccessPage requestId={params.requestId} />;
}
