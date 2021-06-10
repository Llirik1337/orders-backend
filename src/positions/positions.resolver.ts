import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PositionsService } from './positions.service';
import { Position } from './entities/position.entity';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';

@Resolver(() => Position)
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Mutation(() => Position)
  async createPosition(
    @Args('createPositionInput') createPositionInput: CreatePositionInput,
  ) {
    return await this.positionsService.create(createPositionInput);
  }

  @Query(() => [Position], { name: 'positions' })
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.positionsService.findAll(deleted);
  }

  @Query(() => Position, { name: 'position' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.positionsService.findOne(id);
  }

  @Mutation(() => Position)
  async updatePosition(
    @Args('updatePositionInput') updatePositionInput: UpdatePositionInput,
  ) {
    return await this.positionsService.update(
      updatePositionInput.id,
      updatePositionInput,
    );
  }

  @Mutation(() => Position)
  async recoveryPosition(@Args('id', { type: () => String }) id: string) {
    return await this.positionsService.recovery(id);
  }

  @Mutation(() => [Position])
  async recoveryPositions(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.positionsService.recoveryList(ids);
  }

  @Mutation(() => Position)
  async forceRemovePosition(@Args('id', { type: () => String }) id: string) {
    return await this.positionsService.forceRemove(id);
  }

  @Mutation(() => Position)
  async removePosition(@Args('id', { type: () => String }) id: string) {
    return await this.positionsService.remove(id);
  }
}
