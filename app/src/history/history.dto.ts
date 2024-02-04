import { ApiProperty } from '@nestjs/swagger';
export class QueryHistoryResponse {
  @ApiProperty()
  domainName: string;

  @ApiProperty()
  addresses: string[];

  @ApiProperty({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ name: 'client_ip' })
  clientIp: string;
}
