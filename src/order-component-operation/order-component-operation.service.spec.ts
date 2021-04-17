import { Test, TestingModule } from '@nestjs/testing';
import { OrderComponentOperationService } from './order-component-operation.service';

describe('OrderComponentOperationService', () => {
  let service: OrderComponentOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderComponentOperationService],
    }).compile();

    service = module.get<OrderComponentOperationService>(OrderComponentOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
