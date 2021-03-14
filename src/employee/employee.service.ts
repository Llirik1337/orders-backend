import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee } from './entities/employee.entity';

let employees: Employee[] = [
  { id: 1, fullName: 'Алтынбаев С.А.', position: 'Инженер' },
  { id: 2, fullName: 'Алешин К.В.', position: 'Инженер' },
];

// Да сука обычный for. ВО - первых нахуй иди, один тут работаю за двоих,
// а во - вторых, хули ты мне сделаешь, в третьих за мат извини
for (let i = 3; i <= 60; ++i) {
  employees.push({
    id: i,
    fullName: `Сотрудик ${i}`,
    position: `Должность ${i}`,
  });
}

let maxIdEmployee = 60;

@Injectable()
export class EmployeeService {
  create(createEmployeeInput: CreateEmployeeInput) {
    const item = new Employee();

    item.id = ++maxIdEmployee;
    item.fullName = createEmployeeInput.fullName;
    item.position = createEmployeeInput.position;

    employees.push(item);

    return item;
  }

  findAll() {
    return employees;
  }

  findOne(id: number) {
    return employees.find((emp) => emp.id === id);
  }

  update(id: number, updateEmployeeInput: UpdateEmployeeInput) {
    const find = this.findOne(id);

    find.fullName = updateEmployeeInput.fullName;
    find.position = updateEmployeeInput.position;

    return find;
  }

  remove(id: number) {
    const find = this.findOne(id);

    // ПИЗДЕЦ, сделал фейк данные на массиве, а оттуда нормально не удалишь элемент
    employees = employees.filter((obj) => obj !== find);

    return find;
  }
}
