import * as TypeORM from 'typeorm';
import Country from './country/country.entity';
import City from './city/city.entity';
import User from './user/user.entity';

const connectDB = async (): Promise<TypeORM.Connection> =>
  TypeORM.createConnection({
    type: 'sqlite',
    database: './db.sql',
    synchronize: true,
    entities: [Country, City, User],
  });

export default connectDB;
