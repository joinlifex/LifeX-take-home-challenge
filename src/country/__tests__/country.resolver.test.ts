import {createCountry} from '../../factories';
import Country from '../country.entity';
import CountryResolver from '../country.resolver';
import COUNTRY_ERRORS from '../country.errors';
import {CreateCountryInput} from '../country.dto';

const Resolver = new CountryResolver();

describe('CountryResolver', () => {
  it('countries should return all countries', async () => {
    const country = await createCountry();

    const data = await Resolver.countries();
    expect(data).toMatchObject([country]);
  });

  it('country should return one country', async () => {
    const country = await createCountry();

    const data = await Resolver.country(country.id);
    expect(data).toMatchObject(country);
  });

  it('createCountry should return the created country', async () => {
    const country: CreateCountryInput = {name: 'CountryName'};

    const data = await Resolver.createCountry(country);
    expect(data.id).toBeDefined();
    expect(data.name).toBe(country.name);

    const res = await Country.findOne({id: data.id});
    expect(res).toBeDefined();
    expect(res).toMatchObject(data);
  });

  it('updateCountry should return the update country', async () => {
    const country = await createCountry({name: 'WrongCountryName'});
    delete country.createdAt;
    delete country.updatedAt;

    const data = await Resolver.updateCountry({...country, name: 'CorrectCountryName'});
    expect(data.id).toBe(country.id);
    expect(data.name).toBe('CorrectCountryName');

    const res = await Country.findOne({id: country.id});
    expect(res).toMatchObject(data);
  });

  it('updateCountry should only update existing country', async () => {
    expect.assertions(1);
    try {
      await Resolver.updateCountry({id: 999} as Country);
    } catch (error) {
      expect(error.message).toBe(COUNTRY_ERRORS.INVALID_ID);
    }
  });

  it('delete should delete and return the country', async () => {
    const country = await createCountry();

    const data = await Resolver.deleteCountry(country.id);
    expect(data).toMatchObject(country);

    const res = await Country.findOne({id: country.id});
    expect(res).toBeUndefined();
  });

  it('deleteCountry should only delete existing country', async () => {
    expect.assertions(1);
    try {
      await Resolver.deleteCountry(999);
    } catch (error) {
      expect(error.message).toBe(COUNTRY_ERRORS.INVALID_ID);
    }
  });
});
