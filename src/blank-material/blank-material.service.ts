import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaterialService } from 'src/material/material.service';
import { CreateBlankMaterialInput } from './dto/create-blank-material.input';
import { UpdateBlankMaterialInput } from './dto/update-blank-material.input';
import {
  BlankMaterial,
  BlankMaterialDocument,
} from './entities/blank-material.entity';
import { AbstractService } from '../_core';

@Injectable()
export class BlankMaterialService extends AbstractService<BlankMaterialDocument> {
  constructor(
    @InjectModel(BlankMaterial.name)
    private readonly blankMaterialModel: Model<BlankMaterialDocument>,
    private readonly materialService: MaterialService,
  ) {
    super(blankMaterialModel);
  }

  async create(createBlankMaterialInput: CreateBlankMaterialInput) {
    const blank = new this.blankMaterialModel();

    blank.length = createBlankMaterialInput.length;

    blank.width = createBlankMaterialInput.width;

    blank.material = await this.materialService.findOne(
      createBlankMaterialInput.materialId,
    );

    blank.diff = this.getDiff(blank);

    await blank.save();
    return blank;
  }

  async update(id: string, updateBlankMaterialInput: UpdateBlankMaterialInput) {
    const blank = await this.findOne(id);

    if (updateBlankMaterialInput.length)
      blank.length = updateBlankMaterialInput.length;

    if (updateBlankMaterialInput.width)
      blank.width = updateBlankMaterialInput.width;

    if (updateBlankMaterialInput.materialId) {
      blank.material = await this.materialService.findOne(
        updateBlankMaterialInput.materialId,
      );
    }

    blank.diff = this.getDiff(blank);

    await blank.save();
    return blank;
  }

  getDiff(blank: BlankMaterialDocument) {
    const diff =
      (blank.width * blank.length) /
      (blank.material.width * blank.material.length);

    return diff;
  }
}
