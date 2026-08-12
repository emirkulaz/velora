export type UserRole =
  | 'SUPER_ADMIN'
  | 'ORGANIZATION_ADMIN'
  | 'OPERATOR'
  | 'VIEWER';

export type EventDirection = 'ENTRY' | 'EXIT';

export type EventStatus = 'CONFIRMED' | 'NEEDS_REVIEW' | 'REJECTED';

export type CameraStatus = 'ONLINE' | 'OFFLINE' | 'UNKNOWN';

export interface HealthResponse {
  service: string;
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  version: string;
}
