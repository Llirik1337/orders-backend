import { Test, TestingModule } from '@nestjs/testing';
import { OperationPriceService } from './operation-price.service';

describe('OperationPriceService', () => {
  let service: OperationPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationPriceService],
    }).compile();

    service = module.get<OperationPriceService>(OperationPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
