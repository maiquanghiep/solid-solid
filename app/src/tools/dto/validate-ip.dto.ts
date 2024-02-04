import { ApiProperty } from '@nestjs/swagger';
export class ValidateIpRequest {
  @ApiProperty()
  ip: string;
}

export class ValidateIPResponse {
  status: boolean;
}
