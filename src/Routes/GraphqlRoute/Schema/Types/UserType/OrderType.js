import {GraphQLString,GraphQLID,GraphQLList} from "graphql";
import {GraphQLObject,GraphQLDate,GrapthQLTime} from "qlboost";
import OrderItemType from "./OrderItemType.js";


export default GraphQLObject({
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
        items:{type:new GraphQLList(OrderItemType)},
    }),
});
