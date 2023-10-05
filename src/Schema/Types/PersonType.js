import {GraphQLObjectType,GraphQLString} from "graphql";


export default new GraphQLObjectType({
    name:"Person",
    fields:()=>({
        name:{type:GraphQLString},
        birthdate:{type:GraphQLString},
        countryId:{type:GraphQLString},
    }),
});
