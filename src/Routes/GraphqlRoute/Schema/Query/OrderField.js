import {GraphQLNonNull,GraphQLID} from "graphql";
import {OrderType} from "../Types/index.js";


export default {
    name:"order",
    type:OrderType,
    args:{
        id:{type:new GraphQLNonNull(GraphQLID)},
    },
    resolve:(_,args,context)=>{
        const {id}=args,{user}=context;
        return user.orders?.find(order=>order.id===id);
    },
}
