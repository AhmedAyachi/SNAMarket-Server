import {GraphQLString} from "graphql";
import {GraphQLObject,GraphQLDate} from "graphqlutils";
import {UserType} from "./index.js";


export default GraphQLObject({
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
