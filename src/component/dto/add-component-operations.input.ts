import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddComponentOperations {
  @Field(() => String, { nullable: false, description: 'notes' })
  id: string;

  @Field(() => [String], { nullable: false })
  operations: string[];
}
