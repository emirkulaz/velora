export type OutboundNotification = {
  to: string;
  title: string;
  body: string;
};

/**
 * Future email/SMS/WhatsApp/push providers implement this interface.
 * Phase 1 ships in-app notifications only — no fake external senders.
 */
export interface NotificationProvider {
  readonly channel: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';
  send(notification: OutboundNotification): Promise<void>;
}
