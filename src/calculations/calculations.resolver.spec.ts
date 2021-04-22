import { Test, TestingModule } from '@nestjs/testing';
import { CalculationsResolver } from './calculations.resolver';
import { CalculationsService } from './calculations.service';

describe('CalculationsResolver', () => {
  let resolver: CalculationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculationsResolver, CalculationsService],
    }).compile();

    resolver = module.get<CalculationsResolver>(CalculationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
