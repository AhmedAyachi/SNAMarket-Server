import {GraphQLObjectType,GraphQLID,GraphQLInt,GraphQLString, GraphQLNonNull} from "graphql";
import {ComplaintType, LazyDataType,OrderType,PersonType,UserType} from "../Types/index.js";
import {User} from "../Models/index.js";


export default new GraphQLObjectType({
    name:"Querier",
    fields:{
        order:{
            type:OrderType,
            args:{id:{type:GraphQLID}},
            resolve:async (_,args)=>{
                const {id}=args;
                const user=await User.findOne({"orders.id":id});
                const order=user.orders.find(order=>order.id===id);
                return order;
            },
        },
        user:{
            type:PersonType,
            args:{id:{type:GraphQLID}},
            resolve:async (_,args)=>await User.findOne({id:args.id}),
        },
        ...Object.fromEntries([
            ["orders",OrderType],
            ["complaints",ComplaintType],
        ].map(([key,type])=>[key,{
            type:LazyDataType(type),
            args:{
                userId:{type:new GraphQLNonNull(GraphQLID)},
                pageindex:{type:GraphQLInt},
            },
            resolve:async (_,args)=>{
                const user=await User.findOne({id:args.userId});
                if(user){
                    const {pageindex=0}=args,step=20;
                    const data=user[key];
                    const count=await User.countDocuments();
                    const pagecount=Math.ceil(count/step);
                    const start=pageindex*step;
                    const items=data.slice(start,start+step);
                    return {
                        pageindex:pageindex>pagecount?pagecount:pageindex,
                        pagecount,items,
                    };
                }
                else{
                    throw new Error("no such user");
                }
            },
        }])),
    },
});
