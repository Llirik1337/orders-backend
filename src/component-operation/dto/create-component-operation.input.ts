import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Operation } from 'src/operation/entities/operation.entity';

@InputType()
export class CreateComponentOperationInput {
  @Field(() => Float)
  time: number;

  @Field(() => String)
  operationId: string;

  @Field(() => String, { nullable: true })
  equipmentId: string;

  @Field(() => [String], { nullable: true })
  blankMaterialsId: string[];
}
