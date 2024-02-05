import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryHistorySchema } from './history/history.entity';
import { HistoryModule } from './history/history.module';
import { ToolsModule } from './tools/tools.module';
import { RootModule } from './root/root.module';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: 'QueryHistory', schema: QueryHistorySchema },
    ]),
    HistoryModule,
    ToolsModule,
    RootModule,
    HealthModule,
    MetricsModule,
  ],
})
export class AppModule {}
