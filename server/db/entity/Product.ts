import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
  belongsToBrand: number;
}

@Entity()
@ObjectType()
export default class Product extends BaseEntity implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field(() => Float)
  price!: number;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  color!: string;

  @Column()
  @Field()
  size!: string;

  @Column()
  @Field(() => Int)
  quantity!: number;

  @Column()
  @Field()
  image!: string;

  @Column()
  @Field(() => Int)
  belongsToBrand!: number;
}
