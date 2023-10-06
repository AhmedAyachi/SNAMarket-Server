import {GraphQLObjectType,GraphQLString} from "graphql";
import {GraphQLDate} from "graphqlutils";


export default new GraphQLObjectType({
    name:"Person",
    fields:()=>({
        name:{type:GraphQLString},
        birthdate:GraphQLDate({
            key:"birthdate",
            required:true,
            prettify:true,
        }),
        countryId:{type:GraphQLString},
    }),
});
