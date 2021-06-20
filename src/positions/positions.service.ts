import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position, PositionDocument } from './entities/position.entity';
import { AbstractService } from '../_core';

@Injectable()
export class PositionsService extends AbstractService<PositionDocument> {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
  ) {
    super(positionModel);
  }

  async create(
    createPositionInput: CreatePositionInput,
  ): Promise<PositionDocument> {
    const createdPosition = new this.positionModel();

    createdPosition.name = createPositionInput.name;

    return await createdPosition.save();
  }

  async update(
    id: string,
    updatePositionInput: UpdatePositionInput,
  ): Promise<PositionDocument> {
    const found = await this.findOne(id);

    if (updatePositionInput.name) found.name = updatePositionInput.name;

    await found.save();
    return await this.findOne(id);
  }
}
