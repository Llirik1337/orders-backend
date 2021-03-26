import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './entities/operation.entity';
import { OperationResolver } from './operation.resolver';
import { OperationService } from './operation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
  ],
  providers: [OperationResolver, OperationService],
  exports: [OperationService],
})
export class OperationModule {}
