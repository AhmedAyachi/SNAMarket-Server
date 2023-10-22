import {GraphQLString,GraphQLID} from "graphql";
import {PersonType} from "../index.js";
import {GraphQLExtendType} from "graphqlutils";


export default GraphQLExtendType(()=>PersonType,{
    name:"User",
    fields:()=>({
        id:{type:GraphQLID},
        sessionId:{type:GraphQLString},
    }),
});
