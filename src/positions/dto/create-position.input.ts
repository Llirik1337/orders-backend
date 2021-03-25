import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePositionInput {
  @Field(() => String)
  name: string;
}
