import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExecutorInput } from './dto/create-executor.input';
import { UpdateExecutorInput } from './dto/update-executor.input';
import { Executor, ExecutorDocument } from './entities/executor.entity';
import { AbstractService } from '../_core';

@Injectable()
export class ExecutorService extends AbstractService<ExecutorDocument> {
  constructor(
    @InjectModel(Executor.name) private executorModel: Model<ExecutorDocument>,
  ) {
    super(executorModel);
  }

  async create(createExecutorInput: CreateExecutorInput) {
    try {
      const createdExecutor = new this.executorModel();
      createdExecutor.name = createExecutorInput.name;
      return createdExecutor.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('create Error -> ', error);
      }
    }
  }

  async update(id: string, updateExecutorInput: UpdateExecutorInput) {
    try {
      const updatedExecutor = await this.findOne(id);
      updatedExecutor.name = updateExecutorInput.name;
      await updatedExecutor.save();
      return await this.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('update Error -> ', error);
      }
    }
  }
}
