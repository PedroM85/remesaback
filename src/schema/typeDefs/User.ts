import { GraphQLObjectType,GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        USR_Id: {type: GraphQLString} ,
        USR_Name: {type: GraphQLString},
        USR_Password:{type: GraphQLString},

    },
});