import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';
import { Operation, OperationDocument } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation.name)
    private readonly operationModel: Model<OperationDocument>,
  ) {}
  async create(
    createOperationInput: CreateOperationInput,
  ): Promise<OperationDocument> {
    const createdOperation = new this.operationModel();

    createdOperation.name = createOperationInput.name;
    createdOperation.notes = createOperationInput.notes;
    createdOperation.price = createOperationInput.price;

    const result = await createdOperation.save();
    console.log('result -> ', result);
    return result;
  }

  async findAll() {
    return await this.operationModel.find().lean({ autopopulate: true });
  }

  async findOne(id: string): Promise<OperationDocument> {
    const found = await this.operationModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Operation not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateOperationInput: UpdateOperationInput,
  ): Promise<OperationDocument> {
    const found = await this.findOne(id);
    if (updateOperationInput.name) found.name = updateOperationInput.name;

    if (updateOperationInput.notes) found.notes = updateOperationInput.notes;

    if (updateOperationInput.price) found.price = updateOperationInput.price;

    await found.save();
    return await this.findOne(id);
  }

  async remove(id: string): Promise<OperationDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
