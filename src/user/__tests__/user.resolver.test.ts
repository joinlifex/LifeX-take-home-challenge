import {createUser, createCity} from '../../factories';
import User from '../user.entity';
import UserResolver from '../user.resolver';
import CITY_ERRORS from '../user.errors';
import {CreateUserInput} from '../user.dto';

const Resolver = new UserResolver();

describe('UserResolver', () => {
  it('users should return all users', async () => {
    const user = await createUser();
    delete user.city;

    const data = await Resolver.users();
    expect(data).toMatchObject([user]);
  });

  it('user should return one user', async () => {
    const user = await createUser();
    delete user.city;

    const data = await Resolver.user(user.id);
    expect(data).toMatchObject(user);
  });

  it('createUser should return the created user', async () => {
    const city = await createCity();
    const user: CreateUserInput = {name: 'UserName', email: 'User@joinlifex.com', cityId: city.id};

    const data = await Resolver.createUser(user);
    expect(data.id).toBeDefined();
    expect(data.name).toBe(user.name);

    const res = await User.findOne({id: data.id});
    expect(res).toBeDefined();
    expect(res).toMatchObject(data);
  });

  it('updateUser should return the update user', async () => {
    const user = await createUser({name: 'WrongUserName'});
    delete user.city;

    const data = await Resolver.updateUser({...user, name: 'CorrectUserName'});
    expect(data.id).toBe(user.id);
    expect(data.name).toBe('CorrectUserName');

    const res = await User.findOne({id: user.id});
    expect(res).toMatchObject(data);
  });

  it('updateUser should only update existing user', async () => {
    expect.assertions(1);
    try {
      await Resolver.updateUser({id: 999} as User);
    } catch (error) {
      expect(error.message).toBe(CITY_ERRORS.INVALID_ID);
    }
  });

  it('delete should delete and return the user', async () => {
    const user = await createUser();
    delete user.city;

    const data = await Resolver.deleteUser(user.id);
    expect(data).toMatchObject(user);

    const res = await User.findOne({id: user.id});
    expect(res).toBeUndefined();
  });

  it('deleteUser should only delete existing user', async () => {
    expect.assertions(1);
    try {
      await Resolver.deleteUser(999);
    } catch (error) {
      expect(error.message).toBe(CITY_ERRORS.INVALID_ID);
    }
  });

  it('should resolve city field', async () => {
    const city = await createCity();
    delete city.country;

    const user: CreateUserInput = {name: 'UserName', email: 'User@joinlifex.com', cityId: city.id};

    const res = await Resolver.createUser(user);
    const data = await Resolver.city(res);
    expect(data).toMatchObject(city);
  });
});
