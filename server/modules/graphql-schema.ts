import { mergeSchemas } from 'apollo-server-express';
import userSchema from './user/graphql-schema';
import merchantSchema from './merchant/graphql-schema';

export default mergeSchemas({
    schemas: [userSchema, merchantSchema],
});
