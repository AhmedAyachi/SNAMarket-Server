import {GraphQLObject} from "graphqlutils";
import {GraphQLInt,GraphQLString,GraphQLNonNull,GraphQLID,GraphQLObjectType} from "graphql";


export default GraphQLObject({
    name:"OrderItem",
    fields:()=>({
        quantity:{type:new GraphQLNonNull(GraphQLInt)},
        unit:{
            type:GraphQLID,
            /* resolve:(parent,args)=>{
                const {unit}=parent;
                if(!units.includes(unit)){throw new Error(`unit is not in ${JSON.stringify(unit)}`)}
                else return unit;
            }, */
        },
        granularity:{type:new GraphQLNonNull(GraphQLString)},
        productId:{type:new GraphQLNonNull(GraphQLString)},
    }),
});

//const units=["kg","t"];
