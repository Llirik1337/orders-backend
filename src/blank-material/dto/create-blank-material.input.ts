import { Field, Float, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBlankMaterialInput {
  @IsMongoId()
  @Field(() => String)
  materialId: string;

  @IsNumber()
  @Field(() => Float)
  length: number;

  @IsNumber()
  @Field(() => Float)
  width: number;
}
