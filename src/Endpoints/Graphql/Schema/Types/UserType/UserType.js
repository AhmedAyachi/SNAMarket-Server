import {GraphQLString,GraphQLID,GraphQLList} from "graphql";
import {PersonType} from "../index.js";
import OrderType from "./OrderType.js";
import ComplaintType from "./ComplaintType.js";
import {GraphQLExtendType} from "graphqlutils";


export default GraphQLExtendType(()=>PersonType,{
    name:"User",
    fields:()=>({
        id:{type:GraphQLID},
        sessionId:{type:GraphQLString},
        /* username:{type:GraphQLString},
        hash:{type:GraphQLString}, */
        /* orders:{type:new GraphQLList(OrderType)},
        complaints:{type:new GraphQLList(ComplaintType)}, */
    }),
});
