import { Test, TestingModule } from '@nestjs/testing';
import { ExecutorResolver } from './executor.resolver';
import { ExecutorService } from './executor.service';

describe('ExecutorResolver', () => {
  let resolver: ExecutorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutorResolver, ExecutorService],
    }).compile();

    resolver = module.get<ExecutorResolver>(ExecutorResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
