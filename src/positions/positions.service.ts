import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position, PositionDocument } from './entities/position.entity';
import { leanOptions } from 'src/common';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
  ) {}
  async create(
    createPositionInput: CreatePositionInput,
  ): Promise<PositionDocument> {
    const createdPosition = new this.positionModel();
    createdPosition.name = createPositionInput.name;
    return await createdPosition.save();
  }

  async findAll() {
    return await this.positionModel.find().lean(leanOptions);
  }

  async findOne(id: string): Promise<PositionDocument> {
    const found = await this.positionModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Position not found by id ${id}`,
      });
    return found;
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

  async remove(id: string): Promise<PositionDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
