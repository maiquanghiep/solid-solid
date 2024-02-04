import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get('/')
  getRoot(): any {
    return {
      version: this.rootService.getVersion(),
      date: this.rootService.getCurrentDate(),
      kubernetes: this.rootService.isRunningUnderKubernetes(),
    };
  }
}
