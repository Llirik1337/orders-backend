import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExecutorInput {
  @Field(() => String, { nullable: false })
  name: string;
}
