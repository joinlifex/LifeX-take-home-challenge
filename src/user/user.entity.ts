import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import {ObjectType, Field, Int} from 'type-graphql';
import City from '../city/city.entity';

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({unique: true})
  email: string;

  /* Belongs to City */
  @Field(type => City)
  @ManyToOne(
    type => City,
    city => city.users
  )
  city: City;

  @Column()
  cityId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
