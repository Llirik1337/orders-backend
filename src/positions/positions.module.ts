import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsResolver } from './positions.resolver';
import { Position, PositionSchema } from './entities/position.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
    ]),
  ],
  providers: [PositionsResolver, PositionsService],
  exports: [PositionsService],
})
export class PositionsModule {}
