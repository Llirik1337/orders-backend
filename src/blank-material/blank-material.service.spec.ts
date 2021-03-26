import { Test, TestingModule } from '@nestjs/testing';
import { BlankMaterialService } from './blank-material.service';

describe('BlankMaterialService', () => {
  let service: BlankMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlankMaterialService],
    }).compile();

    service = module.get<BlankMaterialService>(BlankMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
