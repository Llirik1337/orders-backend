import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEquipmentInput {
  @IsString()
  @Field(() => String, {
    nullable: false,
    description: 'Name of Equipment',
  })
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    defaultValue: '',
    description: 'Notes of Equipment',
  })
  specifications?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    defaultValue: '',
    description: 'Notes of Equipment',
  })
  notes?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, {
    nullable: true,
    defaultValue: 0,
    description: '',
  })
  releaseYear?: number;

  @IsNumber()
  @Field(() => Int, {
    defaultValue: 0,
    description: 'Count of Equipment'
  })
  count: number;
}
