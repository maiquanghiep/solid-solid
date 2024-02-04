import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { QueryHistorySchema } from '../history/history.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'QueryHistory', schema: QueryHistorySchema },
    ]),
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
