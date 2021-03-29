import { Injectable } from '@nestjs/common';
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
    return this.userModel.find({}, { id: 1, login: 1 }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateUserInput);
  }

  async remove(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
