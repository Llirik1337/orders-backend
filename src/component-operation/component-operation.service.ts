import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlankMaterialService } from 'src/blank-material/blank-material.service';
import { BlankMaterialDocument } from 'src/blank-material/entities/blank-material.entity';
import { EquipmentService } from 'src/equipment/equipment.service';
import { OperationService } from 'src/operation/operation.service';
import { CreateComponentOperationInput } from './dto/create-component-operation.input';
import { UpdateComponentOperationInput } from './dto/update-component-operation.input';
import {
  ComponentOperation,
  ComponentOperationDocument,
} from './entities/component-operation.entity';
import { AbstractService } from '../_core';

@Injectable()
export class ComponentOperationService extends AbstractService<ComponentOperationDocument> {
  constructor(
    @InjectModel(ComponentOperation.name)
    private readonly componentOperationModel: Model<ComponentOperationDocument>,
    private readonly operationService: OperationService,
    private readonly blankMaterialService: BlankMaterialService,
    private readonly equipmentService: EquipmentService,
  ) {
    super(componentOperationModel);
  }

  async create(createComponentOperationInput: CreateComponentOperationInput) {
    const createdComponentOperation = new this.componentOperationModel();

    if (createComponentOperationInput.time) {
      createdComponentOperation.time = createComponentOperationInput.time;
    }

    if (createComponentOperationInput.equipmentId) {
      createdComponentOperation.equipment = await this.equipmentService.findOne(
        createComponentOperationInput.equipmentId,
      );
    }

    if (createComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = createComponentOperationInput.blankMaterialsId.map(
        (id) => this.blankMaterialService.findOne(id),
      );

      const material = await Promise.all<BlankMaterialDocument>(
        promiseBlankMaterials,
      );

      createdComponentOperation.blankMaterials = material.filter(
        (item) => !!item,
      );
    }

    if (createComponentOperationInput.operationId) {
      createdComponentOperation.operation = await this.operationService.findOne(
        createComponentOperationInput.operationId,
      );
    }

    await createdComponentOperation.save();
    return createdComponentOperation;
  }

  async update(
    id: string,
    updateComponentOperationInput: UpdateComponentOperationInput,
  ) {
    const updatedComponentOperation = await this.findOne(id);

    if (updateComponentOperationInput.time) {
      updatedComponentOperation.time = updateComponentOperationInput.time;
    }

    if (updateComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = updateComponentOperationInput.blankMaterialsId.map(
        (id) => this.blankMaterialService.findOne(id),
      );

      const material = await Promise.all<BlankMaterialDocument>(
        promiseBlankMaterials,
      );

      updatedComponentOperation.blankMaterials = material.filter(
        (item) => !!item,
      );
    }

    if (updateComponentOperationInput.equipmentId) {
      updatedComponentOperation.equipment = await this.equipmentService.findOne(
        updateComponentOperationInput.equipmentId,
      );
    }

    if (updateComponentOperationInput.operationId) {
      updatedComponentOperation.operation = await this.operationService.findOne(
        updateComponentOperationInput.operationId,
      );
    }

    await updatedComponentOperation.save();
    return await this.findOne(id);
  }
}
