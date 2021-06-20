import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComponentOperationService } from 'src/component-operation/component-operation.service';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { Component, ComponentDocument } from './entities/component.entity';
import { AbstractService } from '../_core';

@Injectable()
export class ComponentService extends AbstractService<ComponentDocument> {
  constructor(
    @InjectModel(Component.name)
    private readonly componentModel: Model<ComponentDocument>,
    private readonly componentOperationService: ComponentOperationService,
  ) {
    super(componentModel);
  }

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

    createdComponent.componentOperations = operations.filter((item) => !!item);

    await createdComponent.save();
    return await createdComponent.save();
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

      updatedComponent.componentOperations = operations.filter(
        (item) => !!item,
      );
    }
    await updatedComponent.save();
    return await updatedComponent.save();
  }
}
