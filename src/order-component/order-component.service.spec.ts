import { Test, TestingModule } from '@nestjs/testing';
import { OrderComponentService } from './order-component.service';

describe('OrderComponentService', () => {
  let service: OrderComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderComponentService],
    }).compile();

    service = module.get<OrderComponentService>(OrderComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
