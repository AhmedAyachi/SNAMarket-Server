import {GraphQLString,GraphQLID} from "graphql";
import {PersonType} from "../index.js";
import {extendObjectType} from "qlboost";


export default extendObjectType(()=>PersonType,{
    name:"User",
    fields:()=>({
        id:{type:GraphQLID},
        sessionId:{type:GraphQLString},
    }),
});
