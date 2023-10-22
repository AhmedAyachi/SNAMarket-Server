import {PersonType} from "../Types/index.js";


export default {
    name:"user",
    type:PersonType,
    //args:{id:{type:new GraphQLNonNull(GraphQLID)}},
    resolve:async (parent,args,context)=>{
        const {user}=context;
        return user;
    },
};
