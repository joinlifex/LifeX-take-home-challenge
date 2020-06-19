import User from '../user.entity';
import {createUser, createCity} from '../../factories';

describe('User', () => {
  it('name should be required', async () => {
    expect.assertions(2);
    try {
      await createUser({name: null});
    } catch (error) {
      expect(error.message).toMatch('NOT NULL');
      expect(error.message).toMatch('user.name');
    }
  });

  it('email should be required', async () => {
    expect.assertions(2);
    try {
      await createUser({email: null});
    } catch (error) {
      expect(error.message).toMatch('NOT NULL');
      expect(error.message).toMatch('user.email');
    }
  });

  it('city should be required', async () => {
    expect.assertions(2);
    try {
      await createUser({city: null});
    } catch (error) {
      expect(error.message).toMatch('NOT NULL');
      expect(error.message).toMatch('user.cityId');
    }
  });

  it('email should be unique', async () => {
    expect.assertions(3);
    await createUser({email: 'User1@joinlifex.com'});
    try {
      await createUser({email: 'User1@joinlifex.com'});
    } catch (error) {
      expect(error.message).toMatch('UNIQUE');
      expect(error.message).toMatch('user.email');
    }
    await createUser({email: 'User2@joinlifex.com'});
    const res = await User.find();
    expect(res.length).toBe(2);
  });

  it('should save city Id', async () => {
    const city = await createCity();
    const user = await createUser({city});
    const res = await User.findOne(user.id);
    expect(res.cityId).toBe(city.id);
  });

  it('should return id and timestamps on create', async () => {
    const user = await createUser();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });
});
