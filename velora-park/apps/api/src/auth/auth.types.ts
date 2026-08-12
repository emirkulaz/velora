import { UserRole } from '@prisma/client';

export interface AuthJwtPayload {
  sub: string;
  organizationId: string | null;
  role: UserRole;
  email: string;
}
