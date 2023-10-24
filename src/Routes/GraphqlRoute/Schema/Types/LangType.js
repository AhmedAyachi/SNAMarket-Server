import { GraphQLString } from "graphql";
import { GraphQLObject } from "graphqlutils";


export default GraphQLObject({
    name:"LangType",
    fields:()=>({
        id:{
            type:GraphQLString,
            resolve:(parent)=>parent._code||parent.$id,
        },
        name:{
            type:GraphQLString,
            resolve:(parent)=>parent._name||parent.$name,
        },
    }),
});
