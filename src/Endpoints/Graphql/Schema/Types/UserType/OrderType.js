import {GraphQLObjectType,GraphQLString,GraphQLID} from "graphql";
import {PersonType} from "../index.js";
import DataBase from "../../../../../DataBase/index.js";
import {GraphQLDate,GrapthQLTime} from "graphqlutils";


export default new GraphQLObjectType({
    name:"Order",
    fields:()=>({
        id:{type:GraphQLID},
        date:GraphQLDate({key:"date",required:true}),
        time:GrapthQLTime({key:"time",required:true}),
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
                const placer=await DataBase.userCollection.findOne({"orders.id":order.id});
                return placer;
            },
        },
    }),
});
