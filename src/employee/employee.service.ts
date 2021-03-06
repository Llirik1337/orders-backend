import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PositionsService } from 'src/positions/positions.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { AbstractService } from '../_core';

@Injectable()
export class EmployeeService extends AbstractService<EmployeeDocument> {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private readonly positionsService: PositionsService,
  ) {
    super(employeeModel);
  }

  async create(
    createEmployeeInput: CreateEmployeeInput,
  ): Promise<EmployeeDocument> {
    const createdEmployee = new this.employeeModel();

    if (this.validateProperty(createEmployeeInput?.fullName)) {
      createdEmployee.fullName = createEmployeeInput.fullName;
    }

    if (this.validateProperty(createEmployeeInput?.positionId)) {
      createdEmployee.position = await this.positionsService.findOne(
        createEmployeeInput.positionId,
      );
    }

    return await createdEmployee.save();
  }

  async update(
    id: string,
    updateEmployeeInput: UpdateEmployeeInput,
  ): Promise<EmployeeDocument> {
    const updatedEmployee = await this.findOne(id);

    if (this.validateProperty(updateEmployeeInput?.fullName)) {
      updatedEmployee.fullName = updateEmployeeInput?.fullName;
    }

    if (this.validateProperty(updateEmployeeInput?.positionId)) {
      updatedEmployee.position = await this.positionsService.findOne(
        updateEmployeeInput.positionId,
      );
    }

    return await updatedEmployee.save();
  }
}
