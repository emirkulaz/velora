import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5174',
    credentials: true,
  },
  namespace: '/events',
})
export class EventsGateway implements OnGatewayConnection {
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    const organizationId = client.handshake.auth?.organizationId as
      | string
      | undefined;
    if (organizationId) {
      void client.join(`org:${organizationId}`);
      this.logger.debug(`Client joined org:${organizationId}`);
    }
  }

  emitEventCreated(organizationId: string, event: unknown) {
    this.server.to(`org:${organizationId}`).emit('vehicle_event.created', event);
  }
}
