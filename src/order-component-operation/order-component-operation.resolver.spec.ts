import { Test, TestingModule } from '@nestjs/testing';
import { OrderComponentOperationResolver } from './order-component-operation.resolver';
import { OrderComponentOperationService } from './order-component-operation.service';

describe('OrderComponentOperationResolver', () => {
  let resolver: OrderComponentOperationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderComponentOperationResolver,
        OrderComponentOperationService,
      ],
    }).compile();

    resolver = module.get<OrderComponentOperationResolver>(
      OrderComponentOperationResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
