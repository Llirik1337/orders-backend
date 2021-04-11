import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExecutorInput } from './dto/create-executor.input';
import { UpdateExecutorInput } from './dto/update-executor.input';
import { Executor, ExecutorDocument } from './entities/executor.entity';

@Injectable()
export class ExecutorService {
  constructor(
    @InjectModel(Executor.name) private executorModel: Model<ExecutorDocument>,
  ) {}

  async create(createExecutorInput: CreateExecutorInput) {
    try {
      const createdExecuter = new this.executorModel();
      createdExecuter.name = createExecutorInput.name;
      return createdExecuter.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('create Error -> ', error);
      }
    }
  }

  async findAll() {
    return this.executorModel.find().lean({ autopopulate: true });
  }

  async findOne(id: string) {
    return this.executorModel.findById(id);
  }

  async update(id: string, updateExecutorInput: UpdateExecutorInput) {
    try {
      const updatedExecuter = await this.findOne(id);
      updatedExecuter.name = updateExecutorInput.name;
      return updatedExecuter.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('update Error -> ', error);
      }
    }
  }

  async remove(id: string) {
    return this.executorModel.findByIdAndRemove(id);
  }
}
