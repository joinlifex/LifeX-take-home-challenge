import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {ObjectType, Field, Int} from 'type-graphql';
import City from '../city/city.entity';

@ObjectType()
@Entity()
class Country extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  name: string;

  /* Have many Cities */
  @OneToMany(
    type => City,
    city => city.country,
    {nullable: true}
  )
  cities: City[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Country;
