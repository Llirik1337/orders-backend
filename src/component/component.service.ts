import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
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

    const promiseOperations = [];
    for (const id of createComponentInput.operationsId) {
      promiseOperations.push(this.componentOperationService.findOne(id));
    }
    const operations = (await Promise.all(promiseOperations)) || [];

    createdComponent.operations = operations;
    return await createdComponent.save();
  }

  async findAll(): Promise<LeanDocument<ComponentDocument>> {
    return await this.componentModel.find().populate('operations').lean();
  }

  async findOne(id: string): Promise<ComponentDocument> {
    return await this.componentModel.findById(id);
  }

  async update(
    id: string,
    updateComponentInput: UpdateComponentInput,
  ): Promise<ComponentDocument> {
    const updatedComponent = await this.componentModel.findById(id);
    updatedComponent.name = updateComponentInput.name;
    updatedComponent.notes = updateComponentInput.notes;

    const promiseOperations = [];
    for (const id of updateComponentInput.operationsId) {
      promiseOperations.push(this.componentOperationService.findOne(id));
    }
    const operations = (await Promise.all(promiseOperations)) || [];

    updatedComponent.operations = operations;
    return await updatedComponent.save();
  }

  // async addComponentOperations(
  //   id: string,
  //   operationsId: Array<string>,
  // ): Promise<ComponentDocument> {
  //   const foundComponent = await this.findOne(id);
  //   const promiseFoundOperations = [];
  //   for (const id of operationsId) {
  //     promiseFoundOperations.push(this.componentOperationService.findOne(id));
  //   }
  //   const foundOperations = await Promise.all(promiseFoundOperations);

  //   for (const operation of foundOperations) {
  //     foundComponent.operations.push(operation);
  //   }
  //   return await foundComponent.save();
  // }

  // async getCost(componentDocument: ComponentDocument) {}

  async remove(id: string): Promise<ComponentDocument> {
    return await this.componentModel.findByIdAndDelete(id);
  }
}