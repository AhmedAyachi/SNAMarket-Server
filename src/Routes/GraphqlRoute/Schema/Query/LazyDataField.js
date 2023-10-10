import {GraphQLInt} from "graphql";
import {LazyDataType} from "../Types/index.js";
import DataBase from "../../../../DataBase/index.js";



export default (name,type)=>({
    type:LazyDataType(type),
    args:{
        pageindex:{type:GraphQLInt},
    },
    resolve:async (_,args,context)=>{
        const {user}=context;
        const {pageindex=0}=args;
        const data=user[name];
        const count=await DataBase.userCollection.countDocuments();
        context.pagecount=Math.ceil(count/statics.step);
        const {pagecount}=context;
        const start=pageindex*statics.step;
        const items=data.slice(start,start+statics.step);
        return {
            pageindex:pageindex>pagecount?pagecount:pageindex,
            pagecount,items,
        };
    },
    pagecount:null,
});

const statics={
    step:15,
}
