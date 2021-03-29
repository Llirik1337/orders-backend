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

@Injectable()
export class ComponentOperationService {
  constructor(
    @InjectModel(ComponentOperation.name)
    private readonly componentOperationModel: Model<ComponentOperationDocument>,
    private readonly operationService: OperationService,
    private readonly blankMaterialService: BlankMaterialService,
    private readonly equipmentService: EquipmentService,
  ) {}
  async create(createComponentOperationInput: CreateComponentOperationInput) {
    const createdComponentOperation = new this.componentOperationModel();
    createdComponentOperation.time = createComponentOperationInput.time;

    if (createComponentOperationInput.equipmentId) {
      const equipment = await this.equipmentService.findById(
        createComponentOperationInput.equipmentId,
      );
      createdComponentOperation.equipment = equipment;
    }

    if (createComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = [];

      for (const materialId of createComponentOperationInput.blankMaterialsId) {
        promiseBlankMaterials.push(
          this.blankMaterialService.findOne(materialId),
        );
      }

      const material = await Promise.all<BlankMaterialDocument>(
        promiseBlankMaterials,
      );

      createdComponentOperation.blankMaterials = material;
    }

    const operation = await this.operationService.findOne(
      createComponentOperationInput.operationId,
    );
    createdComponentOperation.operation = operation;
    await createdComponentOperation.save();
    await this.updateCost(createdComponentOperation);
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

  async updateCost(componentOperation: ComponentOperationDocument) {
    await componentOperation
      .populate('operation')
      .populate('blankMaterials')
      .execPopulate();
    let cost = 0;
    for (const blankMaterial of componentOperation.blankMaterials) {
      if (blankMaterial?.cost) cost += blankMaterial.cost;
    }
    if (componentOperation.operation?.price)
      cost += componentOperation.operation.price;

    componentOperation.cost = cost;
    await componentOperation.save();
  }

  async findOne(id: string) {
    return await this.componentOperationModel.findById(id);
  }

  async update(
    id: string,
    updateComponentOperationInput: UpdateComponentOperationInput,
  ) {
    const updatedComponentOperation = await this.findOne(id);
    updatedComponentOperation.time = updateComponentOperationInput.time;

    if (updateComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = [];

      for (const materialId of updateComponentOperationInput.blankMaterialsId) {
        promiseBlankMaterials.push(
          this.blankMaterialService.findOne(materialId),
        );
      }

      const materials = (
        await Promise.all<BlankMaterialDocument>(promiseBlankMaterials)
      ).filter((item) => !!item);

      updatedComponentOperation.blankMaterials = materials;
    }

    if (updateComponentOperationInput.operationId) {
      const operation = await this.operationService.findOne(
        updateComponentOperationInput.operationId,
      );
      updatedComponentOperation.operation = operation;
    }
    await updatedComponentOperation.save();
    await this.updateCost(updatedComponentOperation);

    return updatedComponentOperation;
  }

  async remove(id: string) {
    return await this.componentOperationModel.findByIdAndDelete(id);
  }
}
