import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position, PositionDocument } from './entities/position.entity';

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
    return await this.positionModel.find().lean({ autopopulate: true });
  }

  async findById(id: string): Promise<PositionDocument> {
    return await this.positionModel.findById(id);
  }

  async update(
    id: string,
    updatePositionInput: UpdatePositionInput,
  ): Promise<PositionDocument> {
    return await this.positionModel.findByIdAndUpdate(id, updatePositionInput);
  }

  async remove(id: string): Promise<PositionDocument> {
    return await this.positionModel.findByIdAndRemove(id);
  }
}
