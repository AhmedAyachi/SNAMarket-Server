import {GraphQLObjectType,GraphQLString,GraphQLID} from "graphql";
import {PersonType} from "../index.js";
import {User} from "../../Models/index.js";


export default new GraphQLObjectType({
    name:"Order",
    fields:()=>({
        id:{type:GraphQLID},
        date:{type:GraphQLString},
        time:{type:GraphQLString},
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
        placer:{
            type:PersonType,
            resolve:async (order,args)=>{
                const placer=await User.findOne({"orders.id":order.id});
                return placer;
            },
        },
    }),
});
