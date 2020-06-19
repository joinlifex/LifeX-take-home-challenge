import Country from './country/country.entity';
import City from './city/city.entity';
import User from './user/user.entity';

/**
 * This file list useful functions to quickly create entities for testing purpose
 */

const getRandom = (): string => {
  return `${Math.round(1000 * Math.random())}-${Date.now()}`;
};

export const createCountry = async (props?: Partial<Country>): Promise<Country> => {
  const defaultProps: Partial<Country> = {name: `Denmark-${getRandom()}`, ...props};

  return Country.create(defaultProps).save();
};

export const createCity = async (props?: Partial<City>): Promise<City> => {
  const defaultProps = {name: `Copenhagen-${getRandom()}`, ...props};

  if (typeof defaultProps.country === 'undefined') {
    const country = await createCountry();
    defaultProps.country = country;
  }

  return City.create(defaultProps).save();
};

export const createUser = async (props?: Partial<User>): Promise<User> => {
  const defaultProps = {name: 'John Doe', email: `john-${getRandom()}@joinlifex.com`, ...props};

  if (typeof defaultProps.city === 'undefined') {
    const city = await createCity();
    defaultProps.city = city;
  }

  return User.create(defaultProps).save();
};
