import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IBrand {
  id: number;
  name: string;
}

@Entity()
@ObjectType()
export default class Brand extends BaseEntity implements IBrand {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  name!: string;
}
