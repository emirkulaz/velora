import { ForbiddenException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthJwtPayload } from '../auth/auth.types';

export function requireOrganizationId(user: AuthJwtPayload): string {
  if (user.role === UserRole.SUPER_ADMIN) {
    throw new ForbiddenException(
      'SUPER_ADMIN must operate in organization context via explicit organizationId.',
    );
  }
  if (!user.organizationId) {
    throw new ForbiddenException('User is not assigned to an organization.');
  }
  return user.organizationId;
}

export function resolveOrganizationScope(
  user: AuthJwtPayload,
  requestedOrganizationId?: string,
): string {
  if (user.role === UserRole.SUPER_ADMIN) {
    if (!requestedOrganizationId) {
      throw new ForbiddenException('organizationId is required for SUPER_ADMIN.');
    }
    return requestedOrganizationId;
  }
  return requireOrganizationId(user);
}
