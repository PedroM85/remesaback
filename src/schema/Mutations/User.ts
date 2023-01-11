import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { SYS_Users } from '../../Entities/sys_users';
import { UserType } from '../typeDefs/User';
import { MessageType } from "../typeDefs/Message";
import bcrypt from 'bcryptjs';

export const CREATE_USER = {
    type: UserType,
    args: {
        USR_Id: { type: GraphQLString },
        USR_Name: { type: GraphQLString },
        USR_Password: { type: GraphQLString },
    },
    async resolve(_: any, args: any) {
        const { USR_Id, USR_Name, USR_Password } = args

        const encryptPassword = await bcrypt.hash(USR_Password, 12)

        const result = await SYS_Users.insert({
            USR_Id: USR_Id,
            USR_Name: USR_Name,
            USR_Password: encryptPassword,
        })

        return { ...args, USR_Id: result.identifiers[0].USR_Id, USR_Password: encryptPassword };
    },
};
export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        USR_Id: { type: GraphQLID },
    },
    async resolve(_: any, { USR_Id }: any) {
        const result = await SYS_Users.delete(USR_Id)
        if (result.affected === 1) return true;
        return false
    },
};

export const UPDATE_USER = {
    type: MessageType,
    args: {
        USR_Id: { type: GraphQLString },
        USR_Name: { type: GraphQLString },
        USR_Password: { type: GraphQLString },
        USR_NewPassword: { type: GraphQLString },
    },
    async resolve(_: any, { USR_Id, USR_Name, USR_Password, USR_NewPassword }: any) {
        console.log(USR_Id, USR_Name, USR_Password)

        const userFound = await SYS_Users.findOneBy({ USR_Id })

        if (!userFound) return {
            success: false,
            message: "User not found",
        }
        
        const IsMatch = await bcrypt.compare(USR_Password, userFound.USR_Password)

        if (!IsMatch) return {
            success: false,
            message: "Old password is incorrect",
        };

        const NewPassword = await bcrypt.hash(USR_NewPassword, 12);

        const result = await SYS_Users.update({ USR_Id }, {
            USR_Name: USR_Name,
            USR_Password: NewPassword
        })

        if (result.affected === 0) return false
        return {
            success: true,
            message: "User Updated successfully"
        }
    },
};
