import {GraphQLString} from "graphql";
import {ComplaintType} from "../Types/index.js";
import {Complaint} from "../../../../DataBase/index.js";


export default {
    type:ComplaintType,
    args:[
        {
            name:"subject",
            type:GraphQLString,
            resolve:(value)=>{
                const subject=Complaint.subjects.find(({id})=>id===value);
                if(!subject){
                    throw new Error("invalid subject");
                }
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
