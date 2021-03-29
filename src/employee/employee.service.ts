import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, LeanDocumentOrArray, Model } from 'mongoose';
import { PositionsService } from 'src/positions/positions.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee, EmployeeDocument } from './entities/employee.entity';

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
    const position = await this.positionsService.findById(
      createEmployeeInput.positionId,
    );
    createdEmployee.position = position;
    return await createdEmployee.save();
  }

  async findAll() {
    return await this.employeeModel.find().lean({ autopopulate: true });
  }

  async findById(id: string): Promise<EmployeeDocument> {
    return await this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeInput: UpdateEmployeeInput,
  ): Promise<EmployeeDocument> {
    return await this.employeeModel.findByIdAndUpdate(id, updateEmployeeInput);
  }

  async remove(id: string): Promise<EmployeeDocument> {
    return await this.employeeModel.findByIdAndRemove(id);
  }
}
