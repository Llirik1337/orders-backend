import { Position } from './../positions/entities/position.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, LeanDocumentOrArray, Model } from 'mongoose';
import { PositionsService } from 'src/positions/positions.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { GraphQLExtension } from 'apollo-server-express';
import { leanOptions } from 'src/common';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private readonly positionsService: PositionsService,
  ) {}

  async create(
    createEmployeeInput: CreateEmployeeInput,
  ): Promise<EmployeeDocument> {
    const createdEmployee = new this.employeeModel();
    createdEmployee.fullName = createEmployeeInput.fullName;
    const position = await this.positionsService.findOne(
      createEmployeeInput.positionId,
    );
    createdEmployee.position = position;
    return await createdEmployee.save();
  }

  async findAll() {
    return await this.employeeModel.find().lean(leanOptions);
  }

  async findOne(id: string): Promise<EmployeeDocument | null> {
    const foundEmployee = await this.employeeModel.findById(id);
    if (!foundEmployee)
      throw new NotFoundException({
        message: `Employee not found by id ${id}`,
      });
    return foundEmployee;
  }

  async update(
    id: string,
    updateEmployeeInput: UpdateEmployeeInput,
  ): Promise<EmployeeDocument> {
    const updatedEmployee = await this.findOne(id);

    if (updateEmployeeInput?.positionId) {
      const position = await this.positionsService.findOne(
        updateEmployeeInput.positionId,
      );

      updatedEmployee.position = position;
    }

    return await updatedEmployee.save();
  }

  async remove(id: string): Promise<EmployeeDocument> {
    const found = await this.findOne(id);
    await found.delete();
    return found;
  }
}
