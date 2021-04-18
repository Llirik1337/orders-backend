import { Injectable, NotFoundException } from '@nestjs/common';
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
      const equipment = await this.equipmentService.findOne(
        createComponentOperationInput.equipmentId,
      );
      createdComponentOperation.equipment = equipment;
    }

    if (createComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = createComponentOperationInput.blankMaterialsId.map(
        (id) => this.blankMaterialService.findOne(id),
      );

      const material = await Promise.all<BlankMaterialDocument>(
        promiseBlankMaterials,
      );

      const filteredMaterial = material.filter((item) => !!item);

      createdComponentOperation.blankMaterials = filteredMaterial;
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
      .lean({ autopopulate: true });
  }

  async updateCost(componentOperation: ComponentOperationDocument) {
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
    const found = await this.componentOperationModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `ComponentOperation not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateComponentOperationInput: UpdateComponentOperationInput,
  ) {
    const updatedComponentOperation = await this.findOne(id);
    updatedComponentOperation.time = updateComponentOperationInput.time;

    if (updateComponentOperationInput.blankMaterialsId) {
      const promiseBlankMaterials = updateComponentOperationInput.blankMaterialsId.map(
        (id) => this.blankMaterialService.findOne(id),
      );

      const material = await Promise.all<BlankMaterialDocument>(
        promiseBlankMaterials,
      );

      const filteredMaterial = material.filter((item) => !!item);

      updatedComponentOperation.blankMaterials = filteredMaterial;
    }

    if (updateComponentOperationInput.operationId) {
      const operation = await this.operationService.findOne(
        updateComponentOperationInput.operationId,
      );
      updatedComponentOperation.operation = operation;
    }
    await updatedComponentOperation.save();
    await this.updateCost(updatedComponentOperation);

    return await this.findOne(id);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
