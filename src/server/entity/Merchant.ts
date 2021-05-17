import { Field, ID, ObjectType} from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Product } from "./Product";


@Entity()
@ObjectType()
export class Merchant extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    guid: number;

    @Column()
    @Field(() => Number)
    index: number;

    @Column()
    @Field(() => String)
    logo: string;

    // this didn't work out of the box, I think some data conversion might be required since current timestamps are string
    // @Column({ type: 'timestamp', nullable: true }) 
    // dateCreated: Date; 

    @Column()
    @Field(() => String)
    dateCreated: string;

    @Column()
    @Field(() => String)
    publishedState: boolean;

    @Column({ type: 'jsonb' })
    @Field(() => String)
    brands: string[];

    @Column({ type: 'jsonb' })
    @Field(() => [Product])
    products: object[];

    @Column()
    @Field(() => String)
    merchant: string;

    @Column()
    @Field(() => String)
    commissionFee: string;

    @Column()
    @Field(() => String)
    contactEmail: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => String)
    publishedDate: string;

    @Column({ type: 'jsonb' })
    @Field(() => String)
    publishedBy: Object;

    @Column()
    companyDescription: string;
}

//module.exports = Merchant;