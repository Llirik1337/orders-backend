import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlankMaterialService } from 'src/blank-material/blank-material.service';
import {
  BlankMaterial,
  BlankMaterialDocument,
} from 'src/blank-material/entities/blank-material.entity';
import { MaterialService } from 'src/material/material.service';
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
    private readonly blankMaterialService: BlankMaterialService,
  ) {}
  async create(createComponentOperationInput: CreateComponentOperationInput) {
    const createdComponentOperation = new this.componentOperationModel();
    createdComponentOperation.isBatch = createComponentOperationInput.isBatch;
    createdComponentOperation.time = createComponentOperationInput.time;

    const promiseBlankMaterials = [];

    for (const materialId of createComponentOperationInput.blankMaterialsId) {
      promiseBlankMaterials.push(this.blankMaterialService.findOne(materialId));
    }

    const materials = await Promise.all<BlankMaterialDocument>(
      promiseBlankMaterials,
    );

    createdComponentOperation.blankMaterials = materials;

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
      .populate('blankMaterials')
      .populate('equipment')
      .lean();
  }

  async findOne(id: string) {
    return await this.componentOperationModel.findById(id);
  }

  async update(
    id: string,
    updateComponentOperationInput: UpdateComponentOperationInput,
  ) {
    const updatedComponentOperation = await this.findOne(id);
    updatedComponentOperation.isBatch = updateComponentOperationInput.isBatch;
    updatedComponentOperation.time = updateComponentOperationInput.time;

    if (updateComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = [];

      for (const materialId of updateComponentOperationInput.blankMaterialsId) {
        promiseBlankMaterials.push(
          this.blankMaterialService.findOne(materialId),
        );
      }

      const materials = await Promise.all<BlankMaterialDocument>(
        promiseBlankMaterials,
      );

      updatedComponentOperation.blankMaterials = materials;
    }

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
