import { ZkProofGenerationPage } from "@/components/zk-proof-generation/zk-proof-generation-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ZkProofGenerationPage requestId={params.requestId} />;
}
