import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @IsString()
  @Field(() => String, { description: 'Full Name of employee' })
  fullName: string;

  @IsMongoId()
  @Field(() => String)
  positionId: string;
}
