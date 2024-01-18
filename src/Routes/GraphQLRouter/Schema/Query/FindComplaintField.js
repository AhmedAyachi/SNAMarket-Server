import {GraphQLNonNull,GraphQLString,GraphQLList} from "graphql";
import {ComplaintType} from "../Types/index.js";


export default {
    name:"findComplaint",
    type:new GraphQLList(ComplaintType),
    args:[{
        name:"query",
        type:new GraphQLNonNull(GraphQLString),
    }],
    resolve:(_,args,context)=>{
        const query=args.query.toLowerCase(),{user}=context;
        return query&&user.complaints?.filter(complaint=>[
            "id","orderId","subject","body",
        ].some(key=>complaint[key]?.includes(query)));
    },
}
