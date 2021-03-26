import { Test, TestingModule } from '@nestjs/testing';
import { ComponentOperationService } from './component-operation.service';

describe('ComponentOperationService', () => {
  let service: ComponentOperationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentOperationService],
    }).compile();

    service = module.get<ComponentOperationService>(ComponentOperationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
