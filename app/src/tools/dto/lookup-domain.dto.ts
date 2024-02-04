import { ApiProperty } from '@nestjs/swagger';
export class LookupDomainRequest {
  @ApiProperty()
  domain: string;
}

export class LookUpDomainResponse {
  @ApiProperty()
  domain: string;

  @ApiProperty()
  addresses: string[];

  @ApiProperty({ name: 'created_at' })
  createdAt: Date;
}
