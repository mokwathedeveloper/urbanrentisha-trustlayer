import { StellarPaymentPage } from "@/components/stellar-payment/stellar-payment-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <StellarPaymentPage requestId={params.requestId} />;
}
