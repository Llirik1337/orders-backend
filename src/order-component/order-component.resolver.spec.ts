import { Test, TestingModule } from '@nestjs/testing';
import { OrderComponentResolver } from './order-component.resolver';
import { OrderComponentService } from './order-component.service';

describe('OrderComponentResolver', () => {
  let resolver: OrderComponentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderComponentResolver, OrderComponentService],
    }).compile();

    resolver = module.get<OrderComponentResolver>(OrderComponentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
