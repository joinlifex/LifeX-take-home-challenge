import {createCity, createCountry, createUser} from '../../factories';
import City from '../city.entity';
import CityResolver from '../city.resolver';
import CITY_ERRORS from '../city.errors';
import {CreateCityInput} from '../city.dto';

const Resolver = new CityResolver();

describe('CityResolver', () => {
  it('cities should return all cities', async () => {
    const city = await createCity();
    delete city.country;

    const data = await Resolver.cities();
    expect(data).toMatchObject([city]);
  });

  it('city should return one city', async () => {
    const city = await createCity();
    delete city.country;

    const data = await Resolver.city(city.id);
    expect(data).toMatchObject(city);
  });

  it('createCity should return the created city', async () => {
    const country = await createCountry();
    const city: CreateCityInput = {name: 'CityName', countryId: country.id};

    const data = await Resolver.createCity(city);
    expect(data.id).toBeDefined();
    expect(data.name).toBe(city.name);

    const res = await City.findOne({id: data.id});
    expect(res).toBeDefined();
    expect(res).toMatchObject(data);
  });

  it('updateCity should return the update city', async () => {
    const city = await createCity({name: 'WrongCityName'});
    delete city.country;

    const data = await Resolver.updateCity({...city, name: 'CorrectCityName'});
    expect(data.id).toBe(city.id);
    expect(data.name).toBe('CorrectCityName');

    const res = await City.findOne({id: city.id});
    expect(res).toMatchObject(data);
  });

  it('updateCity should only update existing city', async () => {
    expect.assertions(1);
    try {
      await Resolver.updateCity({id: 999} as City);
    } catch (error) {
      expect(error.message).toBe(CITY_ERRORS.INVALID_ID);
    }
  });

  it('delete should delete and return the city', async () => {
    const city = await createCity();
    delete city.country;

    const data = await Resolver.deleteCity(city.id);
    expect(data).toMatchObject(city);

    const res = await City.findOne({id: city.id});
    expect(res).toBeUndefined();
  });

  it('deleteCity should only delete existing city', async () => {
    expect.assertions(1);
    try {
      await Resolver.deleteCity(999);
    } catch (error) {
      expect(error.message).toBe(CITY_ERRORS.INVALID_ID);
    }
  });

  it('should resolve country field', async () => {
    const country = await createCountry();
    const city: CreateCityInput = {name: 'CityName', countryId: country.id};

    const res = await Resolver.createCity(city);
    const data = await Resolver.country(res);
    expect(data).toMatchObject(country);
  });

  it('should resolve users field', async () => {
    const city = await createCity();
    const otherCity = await createCity();
    const user1 = await createUser({city});
    const user2 = await createUser({city});
    const user3 = await createUser({city: otherCity});
    const users = await Resolver.users(city);
    expect(users).toHaveLength(2);
    const userIds = users.map(user => user.id);
    expect(userIds).toContain(user1.id);
    expect(userIds).toContain(user2.id);
    expect(userIds).not.toContain(user3.id);
  });
});
