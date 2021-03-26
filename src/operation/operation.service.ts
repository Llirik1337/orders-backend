import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EquipmentService } from 'src/equipment/equipment.service';
import { MaterialService } from 'src/material/material.service';
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
    return await this.operationModel
      .find()
      .populate('materials')
      .populate('equipment')
      .exec();
  }

  async findOne(id: string): Promise<OperationDocument> {
    return await this.operationModel.findById(id);
  }

  async update(
    id: string,
    updateOperationInput: UpdateOperationInput,
  ): Promise<OperationDocument> {
    return await this.operationModel.findByIdAndUpdate(
      id,
      updateOperationInput,
    );

    // const updatedOperation = await this.operationModel.findById(id);

    // updatedOperation.name = updateOperationInput.name;

    // return await updatedOperation.save();
  }

  async remove(id: string): Promise<OperationDocument> {
    return await this.operationModel.findByIdAndRemove(id);
  }
}
