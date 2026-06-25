import { AgentVerificationStatus, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "ChangeMe123!", 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@urbanrentisha.local" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@urbanrentisha.local",
      passwordHash,
      name: "UrbanRentisha Admin",
      role: UserRole.ADMIN
    }
  });

  const agentPasswordHash = await bcrypt.hash("Agent123!", 10);
  const agent = await prisma.user.upsert({
    where: { email: "agent@urbanrentisha.local" },
    update: {},
    create: {
      email: "agent@urbanrentisha.local",
      passwordHash: agentPasswordHash,
      name: "Grace Agent",
      role: UserRole.AGENT,
      agentProfile: {
        create: {
          agencyName: "Green View Realty",
          licenseNumber: "AGT-KE-2048",
          verificationStatus: AgentVerificationStatus.VERIFIED,
          trustScore: 91
        }
      }
    },
    include: { agentProfile: true }
  });

  await prisma.listing.create({
    data: {
      title: "Kilimani Green View Apartment",
      description: "Verified two-bedroom apartment with secure access and clear viewing process.",
      location: "Kilimani, Nairobi",
      address: "Kilimani Road, Nairobi",
      rentAmount: 65000,
      currency: "KES",
      viewingFee: 500,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: "Apartment",
      verificationStatus: "VERIFIED",
      ownerId: agent.id,
      agentId: agent.agentProfile?.id
    }
  });

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
