import {GraphQLObject} from "graphqlutils";
import {GraphQLInt,GraphQLString,GraphQLNonNull,GraphQLID,GraphQLObjectType} from "graphql";


export default GraphQLObject({
    name:"OrderItem",
    fields:()=>({
        ref:{type:new GraphQLNonNull(GraphQLID)},
        name:{type:GraphQLString},
        quantity:{type:new GraphQLNonNull(GraphQLInt)},
        unit:{type:GraphQLID},
        granularity:{type:new GraphQLNonNull(GraphQLString)},
    }),
});
