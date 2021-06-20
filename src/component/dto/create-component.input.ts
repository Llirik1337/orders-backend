import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class CreateComponentInput {
  @IsString()
  @Field(() => String, { nullable: false, description: 'notes' })
  name: string;

  @IsString()
  @Field(() => String, { nullable: true })
  notes?: string;

  //TODO Добавить потом
  // @Prop({
  //   type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Order' }],
  //   default: [],
  // })
  // @Field(() => Order, { defaultValue: [] })
  // orders: Order[];

  @IsArray()
  @Field(() => [String], { nullable: false })
  operationsId: string[];
}
