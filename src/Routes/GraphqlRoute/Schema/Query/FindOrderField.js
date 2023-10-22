import {GraphQLNonNull,GraphQLString,GraphQLList} from "graphql";
import {OrderType} from "../Types/index.js";


export default {
    name:"findOrder",
    type:new GraphQLList(OrderType),
    args:[{
        name:"query",
        type:new GraphQLNonNull(GraphQLString),
    }],
    resolve:(_,args,context)=>{
        const query=args.query.toLowerCase(),{user}=context;
        return query&&user.orders?.filter(({id,items})=>(
            id.includes(query)||
            items.some(({ref,name})=>ref.includes(query)||name.includes(query))
        ));
    },
}
