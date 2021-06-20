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

    if (this.validateProperty(createOperationInput?.name)) {
      createdOperation.name = createOperationInput.name;
    }

    if (this.validateProperty(createOperationInput?.price)) {
      createdOperation.price = createOperationInput.price;
    }

    if (this.validateProperty(createOperationInput?.notes)) {
      createdOperation.notes = createOperationInput.notes;
    }

    return await createdOperation.save();
  }

  async update(
    id: string,
    updateOperationInput: UpdateOperationInput,
  ): Promise<OperationDocument> {
    const found = await this.findOne(id);

    if (this.validateProperty(updateOperationInput?.name)) {
      found.name = updateOperationInput.name;
    }

    if (this.validateProperty(updateOperationInput?.price)) {
      found.price = updateOperationInput.price;
    }

    if (this.validateProperty(updateOperationInput?.notes)) {
      found.notes = updateOperationInput.notes;
    }

    return await found.save();
  }
}
