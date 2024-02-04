import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryHistory, QueryHistoryDocument } from './history.entity';
import { QueryHistoryResponse } from './history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(QueryHistory.name)
    private readonly queryHistoryModel: Model<QueryHistoryDocument>,
  ) {}

  async getQueriesHistory(): Promise<QueryHistoryResponse[]> {
    const queryHistory = await this.queryHistoryModel
      .find()
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();

    const queryHistoryResponse: QueryHistoryResponse[] = queryHistory.map(
      (history) => ({
        domainName: history.domainName,
        addresses: history.addresses,
        createdAt: history.createdAt,
        clientIp: history.clientIp,
      }),
    );

    return queryHistoryResponse;
  }
}
