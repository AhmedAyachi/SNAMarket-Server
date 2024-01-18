import {GraphQLInt,GraphQLList} from "graphql";
import {GraphQLObject} from "qlboost";


export default (type)=>GraphQLObject({
    name:`${type.name}LazyData`,
    fields:()=>({
        pageindex:{type:GraphQLInt},
        pagecount:{type:GraphQLInt},
        items:{type:new GraphQLList(type)},
    }),
});
