import {GraphQLObjectType,GraphQLID,GraphQLNonNull} from "graphql";
import {ComplaintType,OrderType,PersonType} from "../Types/index.js";
import LazyDataField from "./LazyDataField.js";
import DataBase from "../../../../DataBase/index.js";


export default new GraphQLObjectType({
    name:"Querier",
    fields:{
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
            args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            resolve:async (_,args,context)=>{
                const {user}=context;
                return user;
            },
        },
        orders:LazyDataField("orders",OrderType),
        complaints:LazyDataField("complaints",ComplaintType),
    },
});