import {Query, Arg, Int, Resolver, Mutation, Args, FieldResolver, Root} from 'type-graphql';

import City from './city.entity';
import {CreateCityInput, UpdateCityInput} from './city.dto';
import Country from '../country/country.entity';
import User from '../user/user.entity';
import CITY_ERRORS from './city.errors';

@Resolver(of => City)
export default class CityResolver {
  @Query(returns => [City])
  async cities(): Promise<City[]> {
    return City.find();
  }

  @Query(returns => City, {nullable: true})
  async city(@Arg('id', type => Int) id: number): Promise<City> {
    return City.findOne({id});
  }

  @Mutation(returns => City)
  async createCity(@Args() data: CreateCityInput): Promise<City> {
    return City.create(data).save();
  }

  @Mutation(returns => City, {nullable: true})
  async updateCity(@Args() data: UpdateCityInput): Promise<City> {
    const city = await City.findOne({id: data.id});
    if (!city) {
      throw new Error(CITY_ERRORS.INVALID_ID);
    }
    Object.assign(city, data);
    await city.save();

    return city;
  }

  @Mutation(returns => City, {nullable: true})
  async deleteCity(@Arg('id', type => Int) id: number): Promise<City> {
    const city = await City.findOne({id});
    if (!city) {
      throw new Error(CITY_ERRORS.INVALID_ID);
    }
    await City.delete(id);

    return city;
  }

  @FieldResolver()
  async country(@Root() city: City): Promise<Country> {
    return Country.findOne(city.countryId);
  }

  @FieldResolver()
  async users(@Root() city: City): Promise<User[] | null> {
    return User.find({cityId: city.id});
  }
}
