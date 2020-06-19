import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import {ObjectType, Field, Int} from 'type-graphql';
import Country from '../country/country.entity';
import User from '../user/user.entity';

@ObjectType()
@Entity()
class City extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  name: string;

  /* Belongs to Country */
  @Field(type => Country)
  @ManyToOne(
    type => Country,
    country => country.cities
  )
  country: Country;

  @Column()
  countryId: number;

  /* Have many Users */
  @Field(type => [User], {nullable: true})
  @OneToMany(
    type => User,
    user => user.city,
    {nullable: true}
  )
  users?: User[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default City;
