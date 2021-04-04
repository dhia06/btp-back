import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('dd')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log("heloo nest")
    return this.appService.getHello();
  }
}
