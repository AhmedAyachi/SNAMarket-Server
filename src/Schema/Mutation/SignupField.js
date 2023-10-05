import {GraphQLString} from "graphql";
import {UserType} from "../Types/index.js";
import {User} from "../Models/index.js";


export default {
    type:UserType,
    args:{
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        birthdate:{type:GraphQLString},
        countryId:{type:GraphQLString},
        password:{type:GraphQLString},
    },
    resolve:async (_,args)=>{
        let user=null;
        let {username}=args;
        if(username){
            username=args.username=username.trim();
            const exists=await User.exists({username});
            if(exists){
                throw new Error("username already exists");
            }
            else{
                args.id=Math.random().toString(36).slice(2);
                user=new User(args);
                await user.save();
            }
        }
        return user;
    },
};
