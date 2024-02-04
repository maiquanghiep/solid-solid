// src/history/history.controller.ts

import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { QueryHistoryResponse } from './history.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('v1/history')
@ApiTags('tools')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({ summary: 'List queries' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: QueryHistoryResponse,
  })
  async getQueriesHistory(): Promise<QueryHistoryResponse[]> {
    return this.historyService.getQueriesHistory();
  }
}
