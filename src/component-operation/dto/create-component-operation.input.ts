import { Field, Float, InputType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString, IsMongoId } from 'class-validator';

@InputType()
export class CreateComponentOperationInput {
  @IsNumber()
  @Field(() => Float, { nullable: true })
  time: number;

  @IsMongoId()
  @Field(() => String, { nullable: true })
  operationId: string;

  @IsMongoId()
  @Field(() => String, { nullable: true })
  equipmentId: string;

  @IsArray()
  @Field(() => [String], { nullable: true })
  blankMaterialsId: string[];
}
