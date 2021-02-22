import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IOrder {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
}

@Entity()
@ObjectType()
export default class Order extends BaseEntity implements IOrder {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id!: string;

  @Column()
  @Field()
  productId!: string;

  @Column()
  @Field(() => Int)
  quantity!: number;

  @Column()
  @Field(() => Float)
  totalPrice!: number;
}
