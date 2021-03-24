import { Test, TestingModule } from '@nestjs/testing';
import { OperationResolver } from './operation.resolver';
import { OperationService } from './operation.service';

describe('OperationResolver', () => {
  let resolver: OperationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationResolver, OperationService],
    }).compile();

    resolver = module.get<OperationResolver>(OperationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
