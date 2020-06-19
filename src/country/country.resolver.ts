import {Query, Arg, Int, Resolver, Mutation, Args} from 'type-graphql';

import Country from './country.entity';
import {CreateCountryInput, UpdateCountryInput} from './country.dto';
import COUNTRY_ERRORS from './country.errors';

@Resolver(of => Country)
export default class CountryResolver {
  @Query(returns => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(returns => Country, {nullable: true})
  async country(@Arg('id', type => Int) id: number): Promise<Country> {
    return Country.findOne({id});
  }

  @Mutation(returns => Country)
  async createCountry(@Args() data: CreateCountryInput): Promise<Country> {
    return Country.create(data).save();
  }

  @Mutation(returns => Country, {nullable: true})
  async updateCountry(@Args() data: UpdateCountryInput): Promise<Country> {
    const country = await Country.findOne({id: data.id});
    if (!country) {
      throw new Error(COUNTRY_ERRORS.INVALID_ID);
    }
    Object.assign(country, data);
    await country.save();

    return country;
  }

  @Mutation(returns => Country, {nullable: true})
  async deleteCountry(@Arg('id', type => Int) id: number): Promise<Country> {
    const country = await Country.findOne({id});
    if (!country) {
      throw new Error(COUNTRY_ERRORS.INVALID_ID);
    }
    await Country.delete(id);

    return country;
  }
}
