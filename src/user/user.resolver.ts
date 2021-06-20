import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.userService.findAll(deleted);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  async recoveryUser(@Args('id', { type: () => String }) id: string) {
    return await this.userService.recovery(id);
  }

  @Mutation(() => [User])
  async recoveryUsers(@Args('ids', { type: () => [String] }) ids: string[]) {
    return await this.userService.recoveryList(ids);
  }

  @Mutation(() => User)
  async forceRemoveUser(@Args('id', { type: () => String }) id: string) {
    return await this.userService.forceRemove(id);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return await this.userService.remove(id);
  }
}
