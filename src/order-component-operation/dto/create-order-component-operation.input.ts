import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class CreateOrderComponentOperationInput {
  @IsMongoId()
  @Field(() => String, { nullable: false })
  componentOperationId: string;

  @IsMongoId()
  @Field(() => String, { nullable: true })
  employeeId?: string;
}
