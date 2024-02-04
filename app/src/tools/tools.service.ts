import { Injectable, Logger } from '@nestjs/common';
import {
  LookupDomainRequest,
  LookUpDomainResponse,
} from './dto/lookup-domain.dto';
import { ValidateIpRequest, ValidateIPResponse } from './dto/validate-ip.dto';
import { QueryHistory, QueryHistoryDocument } from '../history/history.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as dns from 'dns';

@Injectable()
export class ToolsService {
  private readonly logger = new Logger(ToolsService.name);
  constructor(
    @InjectModel(QueryHistory.name)
    private queryHistoryModel: Model<QueryHistoryDocument>,
  ) {}

  async lookupDomain(
    lookupDomainDto: LookupDomainRequest,
    ip: string,
  ): Promise<LookUpDomainResponse> {
    const domain = lookupDomainDto.domain;
    console.log(domain);

    // Validate the domain input
    if (!this.isValidDomain(domain)) {
      throw new Error('Invalid domain');
    }

    try {
      // Resolve the IP addresses for the domain
      const addresses: string[] = await this.resolveDomain(domain);

      // Construct the QueryHistory object with the IP addresses
      const queryHistory: QueryHistoryDocument = new this.queryHistoryModel({
        domainName: domain,
        addresses: addresses,
        clientIp: ip,
      });

      await queryHistory.save();

      // Log the successful query
      this.logQuery(queryHistory);
      const {
        domainName,
        addresses: resolvedAddresses,
        createdAt,
      } = queryHistory;
      const response: LookUpDomainResponse = {
        domain: domainName,
        addresses: resolvedAddresses,
        createdAt: createdAt,
      };

      return response;
    } catch (error) {
      this.logger.error(`Failed to lookup domain: ${error.message}`);
      throw new Error('Failed to lookup domain');
    }
  }

  async validateIp(
    validateIpDto: ValidateIpRequest,
  ): Promise<ValidateIPResponse> {
    const ipRegex =
      /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    const response: ValidateIPResponse = {
      status: ipRegex.test(validateIpDto.ip),
    };
    return response;
  }

  private isValidDomain(domain: string): boolean {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }

  private resolveDomain(domain: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      dns.resolve4(domain, (error, addresses) => {
        if (error) {
          reject(error);
        } else {
          resolve(addresses);
        }
      });
    });
  }

  private logQuery(query: QueryHistoryDocument): void {
    // Implement your logging logic here
    // For example, you can use a database or a logging service to log the query
    // You can use the provided query object to extract the necessary information
    this.logger.log(
      `Query logged - Domain: ${query.domainName}, Addresses: ${query.addresses}`,
    );
  }
}
