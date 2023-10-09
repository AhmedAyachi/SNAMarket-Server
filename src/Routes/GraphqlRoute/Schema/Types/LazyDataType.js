import {GraphQLObjectType,GraphQLInt,GraphQLList} from "graphql";


export default (type)=>new GraphQLObjectType({
    name:`${type.name}LazyData`,
    fields:()=>({
        pageindex:{type:GraphQLInt},
        pagecount:{type:GraphQLInt},
        items:{type:new GraphQLList(type)},
    }),
});
