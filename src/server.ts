import 'reflect-metadata';
import 'dotenv/config';
import {ApolloServer} from 'apollo-server';
import {buildSchema} from 'type-graphql';
import CountryResolver from './country/country.resolver';
import connectDB from './connectDB';
import UserResolver from './user/user.resolver';
import CityResolver from './city/city.resolver';

const PORT = process.env.PORT || 3005;

(async () => {
  try {
    await connectDB();

    const schema = await buildSchema({
      resolvers: [CountryResolver, UserResolver, CityResolver],
      validate: false,
    });

    const server = new ApolloServer({
      schema,
    });

    await server.listen({port: PORT});
    console.log('Server listening on port:', PORT);
  } catch (error) {
    console.log('ERROR', error);
  }
})();
