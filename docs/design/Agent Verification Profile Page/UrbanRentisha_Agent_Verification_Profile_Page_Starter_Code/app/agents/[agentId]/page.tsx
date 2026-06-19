import { AgentVerificationProfilePage } from "@/components/agent-profile/agent-verification-profile-page";

type PageProps = {
  params: {
    agentId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <AgentVerificationProfilePage agentId={params.agentId} />;
}
