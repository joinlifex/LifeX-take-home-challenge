import Country from '../country.entity';
import {createCountry} from '../../factories';

describe('Country', () => {
  it('name should be required', async () => {
    expect.assertions(2);
    try {
      await createCountry({name: null});
    } catch (error) {
      expect(error.message).toMatch('NOT NULL');
      expect(error.message).toMatch('country.name');
    }
  });

  it('name should be unique', async () => {
    expect.assertions(3);
    await createCountry({name: 'Country1'});
    try {
      await createCountry({name: 'Country1'});
    } catch (error) {
      expect(error.message).toMatch('UNIQUE');
      expect(error.message).toMatch('country.name');
    }
    await createCountry({name: 'Country2'});
    const res = await Country.find();
    expect(res.length).toBe(2);
  });

  it('should return id and timestamps on create', async () => {
    const country = await createCountry();
    expect(country).toHaveProperty('id');
    expect(country).toHaveProperty('createdAt');
    expect(country).toHaveProperty('updatedAt');
  });
});
