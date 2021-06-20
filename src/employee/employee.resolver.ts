import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'employees' })
  async findAll(
    @Args('deleted', { type: () => Boolean, defaultValue: false })
    deleted: boolean,
  ) {
    return await this.employeeService.findAll(deleted);
  }

  @Query(() => Employee, { name: 'employee' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return await this.employeeService.create(createEmployeeInput);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return await this.employeeService.update(
      updateEmployeeInput.id,
      updateEmployeeInput,
    );
  }

  @Mutation(() => Employee)
  async recoveryEmployee(@Args('id', { type: () => String }) id: string) {
    return await this.employeeService.recovery(id);
  }

  @Mutation(() => [Employee])
  async recoveryEmployees(
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    return await this.employeeService.recoveryList(ids);
  }

  @Mutation(() => Employee)
  async forceRemoveEmployee(@Args('id', { type: () => String }) id: string) {
    return await this.employeeService.forceRemove(id);
  }

  @Mutation(() => Employee)
  async removeEmployee(@Args('id', { type: () => String }) id: string) {
    return await this.employeeService.remove(id);
  }
}
