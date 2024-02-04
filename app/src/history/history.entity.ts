import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QueryHistoryDocument = QueryHistory & Document;

@Schema()
export class QueryHistory {
  @Prop({ required: true, name: 'domain_name' })
  domainName: string;

  @Prop({ required: true, name: 'addresses' })
  addresses: string[];

  @Prop({ required: true, default: Date.now, name: 'created_at' })
  createdAt: Date;

  @Prop({ required: true, name: 'client_ip' })
  clientIp: string;
}

export const QueryHistorySchema = SchemaFactory.createForClass(QueryHistory);
