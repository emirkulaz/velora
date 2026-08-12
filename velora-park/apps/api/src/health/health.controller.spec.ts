import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  it('returns health payload from service', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            check: async () => ({
              service: 'velora-park-api',
              status: 'ok',
              timestamp: '2026-01-01T00:00:00.000Z',
              version: '0.1.0',
            }),
          },
        },
      ],
    }).compile();

    const controller = moduleRef.get(HealthController);
    await expect(controller.check()).resolves.toMatchObject({
      service: 'velora-park-api',
      status: 'ok',
    });
  });
});
