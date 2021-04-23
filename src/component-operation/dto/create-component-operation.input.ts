import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';
@InputType()
export class CreateComponentOperationInput {
  @IsNumber()
  @Field(() => Float, { nullable: true })
  time: number;

  @IsString()
  @Field(() => String, { nullable: true })
  operationId: string;

  @IsString()
  @Field(() => String, { nullable: true })
  equipmentId: string;

  @IsArray()
  @Field(() => [String], { nullable: true })
  blankMaterialsId: string[];
}
