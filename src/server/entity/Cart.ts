
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity()
@ObjectType()
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id: number;

    @Column()
    @Field(() => String)
    sessionId: string;

    @Column({ type: 'jsonb' })
    @Field(() => [cartProduct])
    products: object[];
}

@ObjectType()
export class cartProduct {
    
    @Field(() => String)
    merchantId: string;

    @Field(() => String)
    productId: string;

    @Field(() => Number)
    quantity: number;

}


@InputType()
export class CartInput {
    @Field(() => String)
    sessionId: string;

    @Field(() => String)
    merchantId: string;

    @Field(() => String)
    productId: string;

    @Field(() => Number)
    quantity: number;

}