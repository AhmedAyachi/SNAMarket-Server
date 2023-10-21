import {GraphQLID,GraphQLNonNull} from "graphql";
import {GraphQLObject} from "graphqlutils";
import {ComplaintType,OrderType,PersonType} from "../Types/index.js";
import LazyDataField from "./LazyDataField.js";
import isValidCart from "./IsValidCartField.js";


export default GraphQLObject({
    name:"Querier",
    fields:{
        isValidCart,
        order:{
            type:OrderType,
            args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            resolve:async (_,args,context)=>{
                const {id}=args,{user}=context;
                const order=user.orders?.find(order=>order.id===id);
                return order;
            },
        },
        user:{
            type:PersonType,
            //args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            resolve:async (_,args,context)=>{
                const {user}=context;
                return user;
            },
        },
        orders:LazyDataField("orders",OrderType),
        complaints:LazyDataField("complaints",ComplaintType),
    },
});
