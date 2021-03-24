import { Test, TestingModule } from '@nestjs/testing';
import { OperationPriceResolver } from './operation-price.resolver';
import { OperationPriceService } from './operation-price.service';

describe('OperationPriceResolver', () => {
  let resolver: OperationPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationPriceResolver, OperationPriceService],
    }).compile();

    resolver = module.get<OperationPriceResolver>(OperationPriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
