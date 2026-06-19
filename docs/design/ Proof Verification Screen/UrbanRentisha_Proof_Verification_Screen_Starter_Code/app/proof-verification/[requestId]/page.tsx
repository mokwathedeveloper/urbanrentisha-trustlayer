import { ProofVerificationPage } from "@/components/proof-verification/proof-verification-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ProofVerificationPage requestId={params.requestId} />;
}
