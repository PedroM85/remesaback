import { GraphQLID, GraphQLList, GraphQLString, } from 'graphql';
import { SYS_Users } from '../../Entities/sys_users'
import { UserType } from "../typeDefs/User";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve() {

        return await SYS_Users.find();

    },
};

export const GET_USER = {
    type: UserType,
    args: {
        USR_Id: { type: GraphQLString }
    },
    async resolve(_: any, args: any) {

        return await SYS_Users.findOneBy({ USR_Id: args.USR_Id });
    },

};