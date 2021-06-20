import { Test, TestingModule } from '@nestjs/testing';
import { ComponentOperationResolver } from './component-operation.resolver';
import { ComponentOperationService } from './component-operation.service';

describe('ComponentOperationResolver', () => {
  let resolver: ComponentOperationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentOperationResolver, ComponentOperationService],
    }).compile();

    resolver = module.get<ComponentOperationResolver>(
      ComponentOperationResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
