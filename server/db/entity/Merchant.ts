import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Brand, { IBrand } from "./Brand";
import Product, { IProduct } from "./Product";

export interface IMerchant {
  id: number;
  guid: string;
  name: string;
  commissionFee: string;
  logo: string;
  companyDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  dateCreated: Date;
  publishedState: boolean;
  publishedDate: Date;
  publishedByUserId: string;
  brands: IBrand[];
  products: IProduct[];
}

@Entity()
@ObjectType()
export default class Merchant extends BaseEntity implements IMerchant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  guid!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  commissionFee!: string;

  @Column()
  @Field()
  logo!: string;

  @Column()
  @Field()
  companyDescription!: string;

  @Column({ type: "date" })
  @Field(() => String)
  dateCreated!: Date;

  @Column()
  @Field()
  publishedState!: boolean;

  @Column({ type: "date" })
  @Field(() => String)
  publishedDate!: Date;

  @Column()
  @Field()
  publishedByUserId!: string;

  @Column()
  @Field()
  contactEmail!: string;

  @Column()
  @Field()
  phone!: string;

  @Column()
  @Field()
  address!: string;

  @Field(() => [Brand])
  @ManyToMany(() => Brand)
  @JoinTable()
  brands!: Brand[];

  @ManyToMany(() => Product)
  @JoinTable()
  @Field(() => [Product])
  products!: Product[];
}
