import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ComponentService } from './component.service';
import { Component } from './entities/component.entity';
import { CreateComponentInput } from './dto/create-component.input';
import { UpdateComponentInput } from './dto/update-component.input';
import { AddComponentOperations } from './dto/add-component-operations.input';

@Resolver(() => Component)
export class ComponentResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation(() => Component)
  async createComponent(
    @Args('createComponentInput') createComponentInput: CreateComponentInput,
  ) {
    return await this.componentService.create(createComponentInput);
  }

  @Query(() => [Component], { name: 'components' })
  async findAll() {
    return await this.componentService.findAll();
  }

  @Query(() => Component, { name: 'component' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.componentService.findOne(id);
  }

  @Mutation(() => Component)
  async updateComponent(
    @Args('updateComponentInput') updateComponentInput: UpdateComponentInput,
  ) {
    return await this.componentService.update(
      updateComponentInput.id,
      updateComponentInput,
    );
  }

  // @Mutation(() => Component)
  // async addComponentOperations(
  //   @Args('addComponentOperations')
  //   addComponentOperations: AddComponentOperations,
  // ) {
  //   return await this.componentService.addComponentOperations(
  //     addComponentOperations.id,
  //     addComponentOperations.operations,
  //   );
  // }

  @Mutation(() => Component)
  async removeComponent(@Args('id', { type: () => String }) id: string) {
    return await this.componentService.remove(id);
  }
}
