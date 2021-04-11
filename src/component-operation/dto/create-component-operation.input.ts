import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';
@InputType()
export class CreateComponentOperationInput {
  @IsNumber()
  @Field(() => Float)
  time: number;

  @IsMongoId()
  @Field(() => String)
  operationId: string;

  @IsString()
  @Field(() => String, { nullable: true })
  equipmentId: string;

  @IsArray({ each: true })
  @Field(() => [String], { nullable: true })
  blankMaterialsId: string[];
}
