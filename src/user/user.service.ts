import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';
import { AbstractService } from '../_core';

@Injectable()
export class UserService extends AbstractService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const createdUser = new this.userModel();

    createdUser.login = createUserInput.login;
    createdUser.password = createUserInput.password;

    return await createdUser.save();
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserDocument> {
    const found = await this.findOne(id);

    if (updateUserInput.login) found.login = updateUserInput.login;
    if (updateUserInput.password) found.password = updateUserInput.password;

    await found.save();
    return await this.findOne(id);
  }
}
