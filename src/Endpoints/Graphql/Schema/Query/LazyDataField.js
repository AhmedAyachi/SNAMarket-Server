import {GraphQLID,GraphQLInt,GraphQLNonNull} from "graphql";
import {GraphQLField} from "graphqlutils";
import {LazyDataType} from "../Types/index.js";
import DataBase from "../../../../DataBase/index.js";



export default (name,type)=>GraphQLField({
    type:LazyDataType(type),
    args:{
        userId:{
            type:new GraphQLNonNull(GraphQLID),
            resolve:(value)=>value.trim().toLowerCase(),
        },
        pageindex:{type:GraphQLInt},
    },
    resolve:async (_,args,context)=>{
        const user=await DataBase.userCollection.findOne({id:args.userId});
        if(user){
            const {pageindex=0}=args;
            const data=user[name];
            if(!context.pagecount){
                console.log("counting docs");
                const count=await DataBase.userCollection.countDocuments();
                context.pagecount=Math.ceil(count/statics.step);
            }
            const {pagecount}=context;
            const start=pageindex*statics.step;
            const items=data.slice(start,start+statics.step);
            return {
                pageindex:pageindex>pagecount?pagecount:pageindex,
                pagecount,items,
            };
        }
        else{
            throw new Error("no such user");
        }
    },
    pagecount:null,
});

const statics={
    step:20,
}
