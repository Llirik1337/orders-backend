import { CreateEmployeeInput } from './create-employee.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @IsMongoId()
  @Field(() => String, { nullable: false })
  id: string;
}
