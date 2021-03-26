import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Operation } from 'src/operation/entities/operation.entity';

@InputType()
export class CreateComponentOperationInput {
  @Field(() => Float)
  time: number;

  @Field(() => String)
  operationId: string;

  @Field(() => Boolean)
  isBatch: boolean;

  @Field(() => String, { nullable: false })
  equipmentId: string;

  @Field(() => [String], { nullable: false })
  blankMaterialsId: string[];
}
