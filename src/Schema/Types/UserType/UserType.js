import {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLList} from "graphql";
import {PersonType} from "../index.js";
import OrderType from "./OrderType.js";
import ComplaintType from "./ComplaintType.js";


export default new GraphQLObjectType({
    name:"User",
    fields:()=>({
        ...PersonType.toConfig().fields,    
        id:{type:GraphQLID},
        username:{type:GraphQLString},
        hash:{type:GraphQLString},
        orders:{type:new GraphQLList(OrderType)},
        complaints:{type:new GraphQLList(ComplaintType)},
    }),
});
