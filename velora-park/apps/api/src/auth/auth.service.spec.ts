import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const jwtService = {
    signAsync: jest.fn().mockResolvedValue('token'),
  };

  const config = {
    getOrThrow: jest.fn().mockReturnValue('secret'),
    get: jest.fn().mockReturnValue('8h'),
  };

  const service = new AuthService(
    prisma as never,
    jwtService as unknown as JwtService,
    config as unknown as ConfigService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects invalid credentials', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(
      service.login({ email: 'a@b.com', password: 'password1' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('returns token for valid user', async () => {
    const passwordHash = await bcrypt.hash('password1', 4);
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'a@b.com',
      name: 'Admin',
      role: UserRole.ORGANIZATION_ADMIN,
      organizationId: 'org1',
      isActive: true,
      passwordHash,
      organization: { name: 'Demo' },
    });

    const result = await service.login({
      email: 'a@b.com',
      password: 'password1',
    });

    expect(result.accessToken).toBe('token');
    expect(result.user.organizationId).toBe('org1');
  });
});
