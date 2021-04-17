import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const createdUser = new this.userModel();
    createdUser.login = createUserInput.login;
    createdUser.password = createUserInput.password;
    return await createdUser.save();
  }

  async findAll() {
    return this.userModel
      .find({}, { id: 1, login: 1 })
      .lean({ autopopulate: true });
  }

  async findOne(id: string): Promise<UserDocument> {
    const found = await this.userModel.findById(id);
    if (!found)
      throw new NotFoundException({
        message: `User not found by id ${id}`,
      });
    return found;
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

  async remove(id: string): Promise<UserDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
