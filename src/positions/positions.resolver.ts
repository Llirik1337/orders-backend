import { Resolver, Query, Mutation, Args, Int, Field } from '@nestjs/graphql';
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
  async findAll() {
    return await this.positionsService.findAll();
  }

  @Query(() => Position, { name: 'position' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return (await this.positionsService.findById(id)).toJSON();
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
  async removePosition(@Args('id', { type: () => String }) id: string) {
    return await this.positionsService.remove(id);
  }
}
