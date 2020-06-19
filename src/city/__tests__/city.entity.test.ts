import City from '../city.entity';
import {createCity, createCountry} from '../../factories';

describe('City', () => {
  it('name should be required', async () => {
    expect.assertions(2);
    try {
      await createCity({name: null});
    } catch (error) {
      expect(error.message).toMatch('NOT NULL');
      expect(error.message).toMatch('city.name');
    }
  });

  it('country should be required', async () => {
    expect.assertions(2);
    try {
      await createCity({country: null});
    } catch (error) {
      expect(error.message).toMatch('NOT NULL');
      expect(error.message).toMatch('city.countryId');
    }
  });

  it('name should be unique', async () => {
    expect.assertions(3);
    await createCity({name: 'City1'});
    try {
      await createCity({name: 'City1'});
    } catch (error) {
      expect(error.message).toMatch('UNIQUE');
      expect(error.message).toMatch('city.name');
    }
    await createCity({name: 'City2'});
    const res = await City.find();
    expect(res.length).toBe(2);
  });

  it('should save country Id', async () => {
    const country = await createCountry();
    const city = await createCity({country});
    const res = await City.findOne(city.id);
    expect(res.countryId).toBe(country.id);
  });

  it('should return id and timestamps on create', async () => {
    const city = await createCity();
    expect(city).toHaveProperty('id');
    expect(city).toHaveProperty('createdAt');
    expect(city).toHaveProperty('updatedAt');
  });
});
