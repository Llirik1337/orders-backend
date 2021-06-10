import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';
import { Operation, OperationDocument } from './entities/operation.entity';
import { AbstractService } from '../_core';

@Injectable()
export class OperationService extends AbstractService<OperationDocument> {
  constructor(
    @InjectModel(Operation.name)
    private readonly operationModel: Model<OperationDocument>,
  ) {
    super(operationModel);
  }

  async create(
    createOperationInput: CreateOperationInput,
  ): Promise<OperationDocument> {
    const createdOperation = new this.operationModel();

    createdOperation.name = createOperationInput.name;
    createdOperation.notes = createOperationInput.notes;
    createdOperation.price = createOperationInput.price;

    return await createdOperation.save();
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
}
