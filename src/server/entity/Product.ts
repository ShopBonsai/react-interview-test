// Initially I was planning to strore the products in a separate table but based on the current product-brand relationship shape, document type or jsob seems more appropriate, 
//keepign this for graphql data definition only

 import { Field, ID, ObjectType } from "type-graphql";

export enum productSize {
    S,
    M,
    L
}

@ObjectType()
export class Product {

    @Field(() => ID)
    id: number;

    @Field(() => Number)
    belongsToBrand: number;

    @Field(() => String)
    name: string;

    @Field(() => Number)
    price: number;

    @Field(() => String)
    description: string;

    @Field(() => String)
    color: string;

    @Field(() => String)
    size: string;

    @Field(() => Number)
    quantity: number;

    @Field(() => String)
    image: string;
}
