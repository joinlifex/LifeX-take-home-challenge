import {ArgsType, Field, Int} from 'type-graphql';
import Country from './country.entity';

@ArgsType()
export class CreateCountryInput implements Partial<Country> {
  @Field()
  name: string;
}

@ArgsType()
export class UpdateCountryInput extends CreateCountryInput {
  @Field(type => Int)
  id: number;
}
