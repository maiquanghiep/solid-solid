import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  private readonly version: string;

  constructor() {
    this.version = process.env.VERSION || '0.1.0';
  }

  getVersion(): string {
    return this.version;
  }

  getCurrentDate(): number {
    return Math.floor(Date.now() / 1000);
  }

  isRunningUnderKubernetes(): boolean {
    return process.env.RUNNING_UNDER_KUBERNETES === 'true';
  }
}
