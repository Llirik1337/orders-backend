import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComponentOperationService } from 'src/component-operation/component-operation.service';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { Component, ComponentDocument } from './entities/component.entity';

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(Component.name)
    private readonly componentModel: Model<ComponentDocument>,
    private readonly componentOperationService: ComponentOperationService,
  ) {}
  async create(
    createComponentInput: CreateComponentInput,
  ): Promise<ComponentDocument> {
    const createdComponent = new this.componentModel();
    createdComponent.name = createComponentInput.name;
    createdComponent.notes = createComponentInput.notes;

    const promiseOperations = createComponentInput.operationsId.map((id) =>
      this.componentOperationService.findOne(id),
    );

    const operations = await Promise.all(promiseOperations);

    const filteredOperations = operations.filter((item) => !!item);

    createdComponent.componentOperations = filteredOperations;

    await createdComponent.save();
    await this.updateCost(createdComponent);
    return await createdComponent.save();
  }

  async findAll() {
    return await this.componentModel.find().lean({ autopopulate: true });
  }

  async findOne(id: string): Promise<ComponentDocument> {
    const found = await this.componentModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `Component not found by id ${id}`,
      });
    return found;
  }

  async update(
    id: string,
    updateComponentInput: UpdateComponentInput,
  ): Promise<ComponentDocument> {
    const updatedComponent = await this.findOne(id);
    updatedComponent.name = updateComponentInput.name;
    updatedComponent.notes = updateComponentInput.notes;

    if (updateComponentInput.operationsId) {
      const promiseOperations = updateComponentInput.operationsId.map((id) =>
        this.componentOperationService.findOne(id),
      );

      const operations = await Promise.all(promiseOperations);

      const filteredOperations = operations.filter((item) => !!item);

      updatedComponent.componentOperations = filteredOperations;
    }
    await updatedComponent.save();
    await this.updateCost(updatedComponent);
    return await updatedComponent.save();
  }

  async updateCost(component: ComponentDocument) {
    await component.populate('componentOperations').execPopulate();
    let cost = 0;

    for (const operation of component.componentOperations) {
      await operation
        .populate('blankMaterials')
        .populate('operations')
        .execPopulate();
      if (operation.blankMaterials)
        for (const material of operation.blankMaterials) {
          if (material) cost += material.cost;
        }
      if (operation.operation) cost += operation.operation.price;
    }

    component.cost = Number(cost.toFixed(2));
  }

  async remove(id: string): Promise<ComponentDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
