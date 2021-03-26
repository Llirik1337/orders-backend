import { Test, TestingModule } from '@nestjs/testing';
import { BlankMaterialResolver } from './blank-material.resolver';
import { BlankMaterialService } from './blank-material.service';

describe('BlankMaterialResolver', () => {
  let resolver: BlankMaterialResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlankMaterialResolver, BlankMaterialService],
    }).compile();

    resolver = module.get<BlankMaterialResolver>(BlankMaterialResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
