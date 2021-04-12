import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field(() => String, { description: 'Example field (placeholder)' })
  body: string;
}
