
import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { services } from './services';
import { ticketProviders } from './tickets.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...services, ...ticketProviders],
  controllers,
  exports: [...services],
})
export class RouteModule {
}
