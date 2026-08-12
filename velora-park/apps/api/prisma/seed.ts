import {
  CameraStatus,
  EventDirection,
  EventStatus,
  PrismaClient,
  UserRole,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const orgName = process.env.SEED_ORG_NAME ?? 'Demo Parking Co';
  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@demo.park').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'VeloraPark!2026';

  const organization = await prisma.organization.upsert({
    where: { slug: 'demo-parking' },
    update: { name: orgName, timezone: 'Africa/Algiers' },
    create: {
      name: orgName,
      slug: 'demo-parking',
      timezone: 'Africa/Algiers',
    },
  });

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Demo Admin',
      passwordHash,
      role: UserRole.ORGANIZATION_ADMIN,
      organizationId: organization.id,
      isActive: true,
    },
    create: {
      email,
      name: 'Demo Admin',
      passwordHash,
      role: UserRole.ORGANIZATION_ADMIN,
      organizationId: organization.id,
    },
  });

  const site = await prisma.parkingSite.upsert({
    where: {
      organizationId_code: {
        organizationId: organization.id,
        code: 'MAIN',
      },
    },
    update: {
      name: 'Main Site',
      timezone: 'Africa/Algiers',
      countryCode: 'DZ',
    },
    create: {
      organizationId: organization.id,
      name: 'Main Site',
      code: 'MAIN',
      timezone: 'Africa/Algiers',
      countryCode: 'DZ',
      address: 'Algiers',
    },
  });

  const entryCamera = await prisma.camera.upsert({
    where: {
      parkingSiteId_code: { parkingSiteId: site.id, code: 'ENTRY-01' },
    },
    update: {
      name: 'Entry Gate A',
      status: CameraStatus.ONLINE,
      lastHeartbeatAt: new Date(),
      organizationId: organization.id,
    },
    create: {
      organizationId: organization.id,
      parkingSiteId: site.id,
      name: 'Entry Gate A',
      code: 'ENTRY-01',
      direction: EventDirection.ENTRY,
      status: CameraStatus.ONLINE,
      lastHeartbeatAt: new Date(),
      rtspUrlEncrypted: null,
      confidenceThreshold: 0.75,
      dedupeWindowSeconds: 30,
    },
  });

  await prisma.camera.upsert({
    where: {
      parkingSiteId_code: { parkingSiteId: site.id, code: 'EXIT-01' },
    },
    update: {
      name: 'Exit Gate A',
      status: CameraStatus.OFFLINE,
      organizationId: organization.id,
    },
    create: {
      organizationId: organization.id,
      parkingSiteId: site.id,
      name: 'Exit Gate A',
      code: 'EXIT-01',
      direction: EventDirection.EXIT,
      status: CameraStatus.OFFLINE,
      rtspUrlEncrypted: null,
    },
  });

  const existingEvents = await prisma.vehicleEvent.count({
    where: { organizationId: organization.id },
  });

  if (existingEvents === 0) {
    const samples = [
      { plate: '16-123-45678', confidence: 0.93, status: EventStatus.CONFIRMED },
      { plate: '16-ABC-12', confidence: 0.61, status: EventStatus.NEEDS_REVIEW },
      { plate: '34-XYZ-99', confidence: 0.88, status: EventStatus.CONFIRMED },
    ];

    for (const [index, sample] of samples.entries()) {
      const detectedAt = new Date(Date.now() - index * 15 * 60 * 1000);
      await prisma.vehicleEvent.create({
        data: {
          organizationId: organization.id,
          parkingSiteId: site.id,
          cameraId: entryCamera.id,
          plateText: sample.plate,
          normalizedPlateText: sample.plate.replace(/[^A-Z0-9]/gi, '').toUpperCase(),
          direction: EventDirection.ENTRY,
          detectedAt,
          confidence: sample.confidence,
          countryCode: 'DZ',
          status: sample.status,
          processingDurationMs: 120 + index * 10,
          recognitions: {
            create: {
              organizationId: organization.id,
              rawText: sample.plate,
              normalizedText: sample.plate.replace(/[^A-Z0-9]/gi, '').toUpperCase(),
              confidence: sample.confidence,
              provider: 'seed',
              countryCode: 'DZ',
            },
          },
        },
      });
    }
  }

  console.log('Seed complete.');
  console.log(`Organization: ${organization.name}`);
  console.log(`Admin: ${email}`);
  console.log(`Entry camera id: ${entryCamera.id}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
