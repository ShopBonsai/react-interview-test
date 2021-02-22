This is a description of introduced changes.

# Backend

## Typescript 

Added typescript support on the backend for greater type safety and maintainability

## SQL database

I've added data persistance to Sqlite3 database. It can be easily swapped out for Postgres or MySQL with litte or no changes to data models

## TypeORM 

Added TypeORM for object-relational mapping 
Given mock data is automatically migrated when the server is ran for the first time.
Another benefit of using TypeORM is that model definitions can be reused for generating GraphQL schema through use of `type-graphql` decorators such as `@ObjectType` and `@Field`

# Frontend

## Refactoring

Refactored components to functional equivalents and added `@react/apollo` library to make use of more advanced caching mechanism.

## Buy Product with specified quantity

Added quantity dropdown and enabled `BUY` functionality. If there are no quantities available, dropdown will be replaced with a text. If there are quantities available, when users click `BUY` button, selected quantity will be used to buy the product and quantity values in the dropdown will be updated with the reduced amount

## Orders

Every successful product buy will record an `Order`. All previous orders are visible on `/orders` page
