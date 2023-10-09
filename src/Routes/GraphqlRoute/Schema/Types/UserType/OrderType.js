import {GraphQLObjectType,GraphQLString,GraphQLID} from "graphql";
import {GraphQLDate,GrapthQLTime,GraphQLField} from "graphqlutils";


export default new GraphQLObjectType({
    name:"Order",
    fields:()=>({
        id:{type:GraphQLID},
        date:GraphQLDate({
            key:"datetime",
            prettify:true,
        }),
        time:GrapthQLTime({
            key:"datetime",
            prettify:true,
        }),
        status:{
            type:GraphQLString,
            resolve:(order)=>{
                switch(order.statusCode){
                    case "p": return "pending";
                    case "d": return "delivered";
                    case "c": return "cancelled";
                    default: return null;
                }
            },
        },
    }),
});
