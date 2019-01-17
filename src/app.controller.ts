import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

const mockData = {
  name: 'Sergei',
  author: 'Sergio0111',
  lastName: 'Shakhov',
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  public getJson(): any {
    return mockData;
  }

  @Post('test')
  public sendData(@Body() data: any): any {
    return data;
  }
}
