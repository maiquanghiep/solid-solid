import { Module } from '@nestjs/common';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';

@Module({
  imports: [
    PrometheusModule.register({
      controller: MetricsController,
    }),
  ],
  providers: [
    /*
    Todo: Implement a middleware to intercept incoming traffics and count them by req.path 
    */
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['path'],
    }),
  ],
})
export class MetricsModule {}
