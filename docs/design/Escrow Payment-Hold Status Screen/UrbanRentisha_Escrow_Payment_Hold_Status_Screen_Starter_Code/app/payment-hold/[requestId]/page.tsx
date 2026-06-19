import { PaymentHoldStatusPage } from "@/components/payment-hold/payment-hold-status-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <PaymentHoldStatusPage requestId={params.requestId} />;
}
