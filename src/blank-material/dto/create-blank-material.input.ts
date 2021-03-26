import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlankMaterialInput {
  @Field(() => String)
  materialId: string;

  @Field(() => Float)
  length: number;

  @Field(() => Float)
  width: number;
}
