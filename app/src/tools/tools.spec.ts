import { Test, TestingModule } from '@nestjs/testing';
import { ToolsService } from './tools.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryHistory } from '../history/history.entity';

describe('ToolsService', () => {
  let toolsService: ToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsService,
        {
          provide: getModelToken(QueryHistory.name),
          useValue: Model,
        },
      ],
    }).compile();

    toolsService = module.get<ToolsService>(ToolsService);
  });

  describe('lookupDomain', () => {
    it('should throw an error if the domain is invalid', async () => {
      const lookupDomainDto = { domain: 'invalid-domain' };
      const ip = '127.0.0.1';

      await expect(
        toolsService.lookupDomain(lookupDomainDto, ip),
      ).rejects.toThrow('Invalid domain');
    });

    it('should throw an error if the domain resolution fails', async () => {
      const lookupDomainDto = { domain: 'example.com' };
      const ip = '127.0.0.1';

      jest
        .spyOn(toolsService as any, 'resolveDomain')
        .mockRejectedValue(new Error('Failed to resolve domain'));

      await expect(
        toolsService.lookupDomain(lookupDomainDto, ip),
      ).rejects.toThrow('Failed to lookup domain');
    });
  });

  describe('validateIp', () => {
    it('should return true if the IP is valid', async () => {
      const validateIpDto = { ip: '192.0.2.1' };

      const result = await toolsService.validateIp(validateIpDto);

      expect(result.status).toBe(true);
    });

    it('should return false if the IP is invalid', async () => {
      const validateIpDto = { ip: 'invalid-ip' };

      const result = await toolsService.validateIp(validateIpDto);

      expect(result.status).toBe(false);
    });
  });
});
