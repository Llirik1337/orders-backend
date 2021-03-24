import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOperationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
