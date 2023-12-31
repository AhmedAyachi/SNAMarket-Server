import {GraphQLString,GraphQLID,GraphQLNonNull} from "graphql";
import {GraphQLObject,GraphQLDate,GrapthQLTime} from "qlboost";
import {Complaint} from "../../../../../DataBase/index.js";


export default GraphQLObject({
    name:"Complaint",
    fields:()=>({  
        id:{type:GraphQLID},
        orderId:{type:GraphQLString},
        date:GraphQLDate({
            key:"datetime",
            prettify:true,
        }),
        time:GrapthQLTime({
            key:"datetime",
            prettify:true,
        }),
        subject:{
            type:new GraphQLNonNull(GraphQLString),
            resolve:({subject})=>{
                return Complaint.subjects.find(({id})=>id===subject)?.name;
            },
        },
        body:{type:new GraphQLNonNull(GraphQLString)},
    }),
});
