import { Module } from '@nestjs/common';
import { EventsModule } from './events.module';

/** Keeps websocket wiring explicit in AppModule imports. */
@Module({
  imports: [EventsModule],
})
export class EventsGatewayModule {}
