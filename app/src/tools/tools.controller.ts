import { Controller, Get, Post, Body, Query, Ip } from '@nestjs/common';
import { ToolsService } from './tools.service';
import {
  LookupDomainRequest,
  LookUpDomainResponse,
} from './dto/lookup-domain.dto';
import { ValidateIpRequest, ValidateIPResponse } from './dto/validate-ip.dto';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('v1/tools')
@ApiTags('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('lookup')
  @ApiOperation({ summary: 'Lookup domain' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: LookUpDomainResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  lookupDomain(
    @Query('domain') domain: string,
    @Ip() ip,
  ): Promise<LookUpDomainResponse> {
    const lookupDomainRequest: LookupDomainRequest = {
      domain: domain,
    };
    return this.toolsService.lookupDomain(lookupDomainRequest, ip);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Simple IP validation' })
  @ApiOkResponse({
    description: 'OK',
    type: ValidateIPResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  validateIp(
    @Body() validateIpDto: ValidateIpRequest,
  ): Promise<ValidateIPResponse> {
    return this.toolsService.validateIp(validateIpDto);
  }
}
