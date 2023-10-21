import {GraphQLString,GraphQLID} from "graphql";
import {GraphQLObject} from "graphqlutils";


export default GraphQLObject({
    name:"Brand",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        logo:{type:GraphQLString},
    }),
});
