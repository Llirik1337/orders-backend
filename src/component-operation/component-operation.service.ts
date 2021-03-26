import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperationService } from 'src/operation/operation.service';
import { CreateComponentOperationInput } from './dto/create-component-operation.input';
import { UpdateComponentOperationInput } from './dto/update-component-operation.input';
import {
  ComponentOperation,
  ComponentOperationDocument,
} from './entities/component-operation.entity';

@Injectable()
export class ComponentOperationService {
  constructor(
    @InjectModel(ComponentOperation.name)
    private readonly componentOperationModel: Model<ComponentOperationDocument>,
    private readonly operationService: OperationService,
  ) {}
  async create(createComponentOperationInput: CreateComponentOperationInput) {
    const createdComponentOperation = new this.componentOperationModel();
    createdComponentOperation.isBatch = createComponentOperationInput.isBatch;
    createdComponentOperation.time = createComponentOperationInput.time;
    const operation = await this.operationService.findOne(
      createComponentOperationInput.operationId,
    );
    createdComponentOperation.operation = operation;
    await createdComponentOperation.save();
    return createdComponentOperation;
  }

  async findAll() {
    return await this.componentOperationModel
      .find()
      .populate('operation')
      .lean();
  }

  async findOne(id: string) {
    return await this.componentOperationModel.findById(id);
  }

  async update(
    id: string,
    updateComponentOperationInput: UpdateComponentOperationInput,
  ) {
    const updatedComponentOperation = await this.componentOperationModel.findById(
      id,
    );
    if (updateComponentOperationInput.isBatch)
      updatedComponentOperation.isBatch = updateComponentOperationInput.isBatch;
    if (updateComponentOperationInput.time)
      updatedComponentOperation.time = updateComponentOperationInput.time;
    if (updateComponentOperationInput.operationId) {
      const operation = await this.operationService.findOne(
        updateComponentOperationInput.operationId,
      );
      updatedComponentOperation.operation = operation;
    }
    await updatedComponentOperation.save();
    return updatedComponentOperation;
  }

  async remove(id: string) {
    return await this.componentOperationModel.findByIdAndDelete(id);
  }
}
