import {ArgsType, Field, Int} from 'type-graphql';
import User from './user.entity';

@ArgsType()
export class CreateUserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(type => Int)
  cityId: number;
}

@ArgsType()
export class UpdateUserInput extends CreateUserInput {
  @Field(type => Int)
  id: number;
}
