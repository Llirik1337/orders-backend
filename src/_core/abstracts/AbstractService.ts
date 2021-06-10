import { Document, Model } from 'mongoose';
import { IService } from '../interfaces';
import { leanOptions } from '../common';
import { NotFoundException } from '@nestjs/common';
import { BaseModel } from '../bases';

export abstract class AbstractService<
  ModelDocument extends Document & BaseModel
> implements IService {
  protected constructor(protected readonly model: Model<ModelDocument>) {}

  private static getDeletedOptions(deleted: boolean) {
    let deletedAtOptions = null;

    if (deleted) {
      deletedAtOptions = {
        $ne: null,
      };
    }
    return deletedAtOptions;
  }

  abstract create(data: any);

  abstract update(id: string, data: any);

  async findAll(deleted = false) {
    return this.model
      .find({ deletedAt: AbstractService.getDeletedOptions(deleted) })
      .lean(leanOptions);
  }

  async findOne(id: string) {
    const found = await this.model.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `${this.model.modelName} not found by id ${id}`,
      });
    return found;
  }

  async recovery(id: string) {
    const found = await this.findOne(id);
    found.deletedAt = null;
    await found.save();
    return this.findOne(id);
  }

  async recoveryList(ids: string[]) {
    return Promise.all(ids.map(async (id) => this.recovery(id)));
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    found.deletedAt = new Date();
    await found.save();
    return this.findOne(id);
  }

  async forceRemove(id: string) {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
