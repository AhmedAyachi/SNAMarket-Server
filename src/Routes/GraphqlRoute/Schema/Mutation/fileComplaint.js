import {GraphQLEnumType,GraphQLString} from "graphql";
import {ComplaintType} from "../Types/index.js";
import {Complaint} from "../../../../DataBase/index.js";


export default {
    type:ComplaintType,
    args:[
        {
            name:"subject",
            type:new GraphQLEnumType({
                name:"Subject",
                values:Object.fromEntries(Complaint.subjects.map(({name})=>[name,{}])),
            }),
            resolve:(value)=>{
                const subject=Complaint.subjects.find(({name})=>name===value);
                return subject.id;
            },
        },
        {name:"body",type:GraphQLString},
        {
            name:"orderId",type:GraphQLString,
            resolve:async (value,args,context)=>{
                const {orders}=context.user;
                if(value&&!orders?.some(order=>order.id===value)){
                    throw new Error("no order with such id");
                }
                return value;
            },
        },
    ],
    resolve:async (parent,args,context,info)=>{
        const {user}=context;
        const complaint=await user.fileComplaint(args);
        return complaint;
    },
};
