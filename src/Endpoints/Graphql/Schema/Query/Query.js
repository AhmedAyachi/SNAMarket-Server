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
            resolve:async (_,args)=>{
                const {id}=args;
                const user=await DataBase.userCollection.findOne({"orders.id":id});
                if(user) return user.orders.find(order=>order.id===id);
                else{
                    throw new Error("no order witch such id");
                }
            },
        },
        user:{
            type:PersonType,
            args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            resolve:async (_,args)=>{
                const user=await DataBase.userCollection.findOne({id:args.id});
                if(user) return user;
                else{
                    throw new Error("no user with such id");
                }
            },
        },
        orders:LazyDataField("orders",OrderType),
        complaints:LazyDataField("complaints",ComplaintType),
    },
});
