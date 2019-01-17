import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [ConfigModule, RouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
