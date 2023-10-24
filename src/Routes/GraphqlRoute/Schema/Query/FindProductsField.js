import {GraphQLList, GraphQLString} from "graphql";
import DataBase from "../../../../DataBase/index.js";
import {ProductType} from "../Types/index.js";



export default {
    name:"findProducts",
    type:new GraphQLList(ProductType),
    args:[{
        name:"query",
        type:GraphQLString,
        resolve:(value)=>value.trim().toLowerCase(),
    }],
    resolve:async (_,args)=>{
        const {query}=args;
        return query&&await DataBase.productCollection.find({
            $or:[
                {id:{$regex:query}},
                {name:{$regex:query}},
                {description:{$regex:query}},
            ],
        },{limit:25}).toArray();
    },
}
