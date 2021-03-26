import { InputType, Int, Field } from '@nestjs/graphql';
import { Operation } from 'src/operation/entities/operation.entity';

@InputType()
export class CreateComponentInput {
  @Field(() => String, { nullable: false, description: 'notes' })
  name: string;

  @Field(() => String, { nullable: true })
  notes: string;

  //TODO Добавить потом
  // @Prop({
  //   type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }],
  //   default: [],
  // })
  // @Field(() => Order, { defaultValue: [] })
  // orders: Order[];

  @Field(() => [String], { nullable: false })
  operationsId: string[];
}
