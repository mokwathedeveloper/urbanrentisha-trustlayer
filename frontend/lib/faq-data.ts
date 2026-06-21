export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqTopic {
  id: string;
  label: string;
  items: FaqItem[];
}

export const faqTopics: FaqTopic[] = [
  {
    id: "stellar-testnet",
    label: "Stellar Testnet",
    items: [
      {
        id: "what-is-testnet",
        question: "What is Stellar testnet and why do we use it?",
        answer:
          "Stellar testnet is a public blockchain test environment that mimics the real Stellar network. UrbanRentisha uses it to settle viewing-fee payments so every transaction can be inspected on a public ledger before any production rollout, without risking real funds.",
      },
      {
        id: "testnet-vs-mainnet",
        question: "Is testnet money real money?",
        answer:
          "No. Testnet XLM has no monetary value. It exists purely so the payment, escrow, and proof workflow can be demonstrated and audited end-to-end on a real blockchain.",
      },
      {
        id: "verify-tx-hash",
        question: "Can I verify a payment transaction myself?",
        answer:
          "Yes. Every confirmed payment stores a real Stellar testnet transaction hash. You can paste it into the Stellar testnet explorer to see the transfer independently of UrbanRentisha.",
      },
    ],
  },
  {
    id: "zk-proof",
    label: "ZK Proof",
    items: [
      {
        id: "what-is-zk-proof",
        question: "How does zero-knowledge proof protect my privacy?",
        answer:
          "After your payment is received, UrbanRentisha generates a Groth16 zero-knowledge proof that proves you paid the correct viewing fee for the correct listing — without revealing your payment secret to anyone, including the agent.",
      },
      {
        id: "proof-verified-onchain",
        question: "Where is the proof actually verified?",
        answer:
          "The proof is verified on-chain by a Soroban smart contract deployed on Stellar testnet. The verification transaction hash is recorded so the result can be checked independently.",
      },
      {
        id: "proof-fails",
        question: "What happens if proof verification fails?",
        answer:
          "If on-chain verification fails, your viewing request stays locked at the payment-received stage and the viewing code is not generated. You can contact support if you believe this is in error.",
      },
    ],
  },
  {
    id: "payment-hold-status",
    label: "Payment / Hold Status",
    items: [
      {
        id: "escrow-explained",
        question: "How does escrow work for viewing fees?",
        answer:
          "Your viewing fee is held against the listing's viewing request until your zero-knowledge proof is verified on-chain and your viewing code is unlocked. Funds are only considered released once the viewing code becomes active.",
      },
      {
        id: "payment-not-confirming",
        question: "Why hasn't my payment confirmed yet?",
        answer:
          "Confirmation requires the transaction hash you submit to match the expected memo and amount on the Stellar testnet ledger. Network confirmation can take a few seconds; if it has been several minutes, double-check the transaction hash.",
      },
      {
        id: "refunds",
        question: "Can I get a refund?",
        answer:
          "Refunds are handled case-by-case through support. Contact support with your booking ID if a viewing did not happen as agreed.",
      },
    ],
  },
  {
    id: "viewing-codes",
    label: "Viewing Codes",
    items: [
      {
        id: "viewing-code-purpose",
        question: "What is a viewing code for?",
        answer:
          "A viewing code is the proof you share with the agent to schedule and access a physical viewing. It is only generated after your payment is received and your zero-knowledge proof is verified.",
      },
      {
        id: "viewing-code-expiry",
        question: "Do viewing codes expire?",
        answer:
          "Yes. Each viewing code has an expiry window shown on your dashboard. If it expires before you complete your viewing, contact the agent or support.",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    items: [
      {
        id: "what-can-i-report",
        question: "What can I report as suspicious?",
        answer:
          "You can report a listing as fake or misleading, or report an agent for suspicious or unprofessional behavior, directly from any listing page or from the Report Fake Listing screen.",
      },
      {
        id: "report-anonymous",
        question: "Will the agent know who reported them?",
        answer:
          "Only if you explicitly choose 'I'm comfortable being contacted' when filing the report. By default, your identity is kept private from the reported party.",
      },
    ],
  },
  {
    id: "safety-rules",
    label: "Safety Rules",
    items: [
      {
        id: "never-share-secret",
        question: "Should I ever share my payment secret with an agent?",
        answer:
          "No. Your payment secret is used only by your browser to generate your zero-knowledge proof. UrbanRentisha and agents never need it and will never ask for it.",
      },
      {
        id: "verify-agent-badge",
        question: "How do I know an agent is verified?",
        answer:
          "Verified agents show a 'Verified' badge on their listings and have a public Agent Verification Profile showing their trust score, listing history, and verification checks.",
      },
    ],
  },
  {
    id: "known-limitations",
    label: "Known Limitations",
    items: [
      {
        id: "testnet-only",
        question: "Is this live on Stellar mainnet?",
        answer:
          "Not yet. UrbanRentisha currently runs entirely on Stellar testnet for demonstration and audit purposes. Mainnet deployment is a planned next step, not a current capability.",
      },
      {
        id: "mvp-scope",
        question: "What is still MVP-stage?",
        answer:
          "File-upload evidence on reports, an in-app messaging system, and tenant rating/review aggregation are not yet implemented. Where the product can't yet back a feature with real data, we leave it out rather than show placeholder numbers.",
      },
    ],
  },
];

export const faqArticleCount = (topicId: string) => faqTopics.find((t) => t.id === topicId)?.items.length ?? 0;
