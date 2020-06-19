import {Query, Arg, Int, Resolver, Mutation, Args, FieldResolver, Root} from 'type-graphql';

import User from './user.entity';
import {CreateUserInput, UpdateUserInput} from './user.dto';
import City from '../city/city.entity';
import USER_ERRORS from './user.errors';

@Resolver(of => User)
export default class UserResolver {
  @Query(returns => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(returns => User, {nullable: true})
  async user(@Arg('id', type => Int) id: number): Promise<User> {
    return User.findOne({id});
  }

  @Mutation(returns => User)
  async createUser(@Args() data: CreateUserInput): Promise<User> {
    return User.create(data).save();
  }

  @Mutation(returns => User, {nullable: true})
  async updateUser(@Args() data: UpdateUserInput): Promise<User> {
    const user = await User.findOne({id: data.id});
    if (!user) {
      throw new Error(USER_ERRORS.INVALID_ID);
    }
    Object.assign(user, data);
    await user.save();

    return user;
  }

  @Mutation(returns => User, {nullable: true})
  async deleteUser(@Arg('id', type => Int) id: number): Promise<User> {
    const user = await User.findOne({id});
    if (!user) {
      throw new Error(USER_ERRORS.INVALID_ID);
    }
    await User.delete(id);

    return user;
  }

  @FieldResolver()
  async city(@Root() user: User): Promise<City> {
    return City.findOne(user.cityId);
  }
}
