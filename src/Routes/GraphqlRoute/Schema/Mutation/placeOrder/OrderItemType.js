import {GraphQLInt,GraphQLInputObjectType,GraphQLString,GraphQLNonNull,GraphQLEnumType} from "graphql";



export default new GraphQLInputObjectType({
    name:"OrderItem",
    fields:()=>({
        quantity:{type:new GraphQLNonNull(GraphQLInt)},
        unit:{type:new GraphQLNonNull(UnitType)},
        granularity:{type:new GraphQLNonNull(GraphQLString)},
        productId:{type:new GraphQLNonNull(GraphQLString)},
    }),
});

const UnitType=new GraphQLEnumType({
    name:"Unit",
    values:{
        kg:{},
        t:{},
    }
});
