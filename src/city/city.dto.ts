import { ArgsType, Field, Int } from 'type-graphql';
import City from './city.entity';

@ArgsType()
export class CreateCityInput implements Partial<City> {
  @Field()
  name: string;

  @Field((type) => Int)
  countryId: number;
}

@ArgsType()
export class UpdateCityInput extends CreateCityInput {
  @Field((type) => Int)
  id: number;
}
