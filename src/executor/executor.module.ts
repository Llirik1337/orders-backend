import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecutorResolver } from './executor.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Executor, ExecutorSchema } from './entities/executor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Executor.name, schema: ExecutorSchema },
    ]),
  ],
  providers: [ExecutorResolver, ExecutorService],
  exports: [ExecutorService],
})
export class ExecutorModule {}
