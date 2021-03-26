import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
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
    private readonly materialService: MaterialService,
    private readonly equipmentService: EquipmentService,
  ) {}
  async create(
    createOperationInput: CreateOperationInput,
  ): Promise<OperationDocument> {
    const createdOperation = new this.operationModel();
    const promiseMaterials = [];

    console.log('materialsId -> ', createOperationInput.materialsId);

    for (const materialId of createOperationInput.materialsId) {
      promiseMaterials.push(this.materialService.findById(materialId));
    }

    const materials = await Promise.all(promiseMaterials);

    createdOperation.name = createOperationInput.name;
    createdOperation.notes = createOperationInput.notes;
    createdOperation.price = createOperationInput.price;

    for (const material of materials) {
      createdOperation.materials.push(material);
    }

    const equipment = await this.equipmentService.findById(
      createOperationInput.equipmentId,
    );

    createdOperation.equipment = equipment;

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
    const updatedOperation = await this.operationModel.findById(id);
    const promiseMaterials = [];
    if (updateOperationInput.price)
      updatedOperation.price = updateOperationInput.price;

    for (const materialId of updateOperationInput.materialsId) {
      promiseMaterials.push(this.materialService.findById(materialId));
    }

    const materials = await Promise.all(promiseMaterials);

    for (const material of materials) {
      updatedOperation.materials.push(material);
    }

    if (updateOperationInput.equipmentId) {
      const equipment = await this.equipmentService.findById(
        updateOperationInput.equipmentId,
      );

      updatedOperation.equipment = equipment;

      updatedOperation.name = updateOperationInput.name;
    }

    return await updatedOperation.save();
  }

  async remove(id: string): Promise<OperationDocument> {
    return await this.operationModel.findByIdAndRemove(id);
  }
}
