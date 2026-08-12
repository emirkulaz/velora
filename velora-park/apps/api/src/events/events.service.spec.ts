import { EventDirection, EventStatus } from '@prisma/client';
import { EventsService } from './events.service';

describe('EventsService', () => {
  const prisma = {
    camera: { findUnique: jest.fn() },
    vehicleEvent: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    notification: { create: jest.fn() },
  };

  const gateway = { emitEventCreated: jest.fn() };

  const service = new EventsService(prisma as never, gateway as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deduplicates events inside cooldown window', async () => {
    prisma.camera.findUnique.mockResolvedValue({
      id: 'cam1',
      organizationId: 'org1',
      parkingSiteId: 'site1',
      isActive: true,
      dedupeWindowSeconds: 30,
      confidenceThreshold: 0.75,
      parkingSite: { countryCode: 'DZ' },
    });
    const existing = { id: 'evt1', plateText: '16ABC123' };
    prisma.vehicleEvent.findFirst.mockResolvedValue(existing);

    const result = await service.createFromRecognition({
      cameraId: 'cam1',
      plateText: '16-ABC-123',
      direction: EventDirection.ENTRY,
      confidence: 0.9,
      countryCode: 'DZ',
    });

    expect(result.deduplicated).toBe(true);
    expect(prisma.vehicleEvent.create).not.toHaveBeenCalled();
  });

  it('marks low confidence as NEEDS_REVIEW', async () => {
    prisma.camera.findUnique.mockResolvedValue({
      id: 'cam1',
      organizationId: 'org1',
      parkingSiteId: 'site1',
      isActive: true,
      dedupeWindowSeconds: 30,
      confidenceThreshold: 0.75,
      parkingSite: { countryCode: 'DZ' },
    });
    prisma.vehicleEvent.findFirst.mockResolvedValue(null);
    prisma.vehicleEvent.create.mockResolvedValue({
      id: 'evt2',
      plateText: 'ABC123',
      confidence: 0.4,
      status: EventStatus.NEEDS_REVIEW,
    });
    prisma.notification.create.mockResolvedValue({});

    const result = await service.createFromRecognition({
      cameraId: 'cam1',
      plateText: 'ABC123',
      direction: EventDirection.ENTRY,
      confidence: 0.4,
      countryCode: 'DZ',
      provider: 'mock',
    });

    expect(result.deduplicated).toBe(false);
    expect(prisma.vehicleEvent.create).toHaveBeenCalled();
    expect(prisma.notification.create).toHaveBeenCalled();
    expect(gateway.emitEventCreated).toHaveBeenCalled();
  });
});
