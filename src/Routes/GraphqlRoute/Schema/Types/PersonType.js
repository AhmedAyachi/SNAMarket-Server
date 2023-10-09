import {GraphQLObjectType,GraphQLString} from "graphql";
import {GraphQLDate} from "graphqlutils";
import { UserType } from "./index.js";


export default new GraphQLObjectType({
    name:"Person",
    fields:()=>({
        name:{type:GraphQLString},
        birthdate:GraphQLDate({
            key:"birthdate",
            required:true,
            prettify:true,
        }),
        user:{type:UserType},
        countryId:{type:GraphQLString},
    }),
});
