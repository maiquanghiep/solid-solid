import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryHistorySchema } from './history.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'QueryHistory', schema: QueryHistorySchema },
    ]),
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
