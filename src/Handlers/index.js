import {User} from "../DataBase/index.js";
import {Error} from "../Resources/index.js";


export const findUserHandler=async (request,response,next)=>{
    const {userId,sessionId}=request.body;
    try{
        const user=await User.findByIds(userId,sessionId);;
        if(user){
            response.locals.user=user;
            response.locals.sessionId=sessionId;
            next();
        }
        else{
            throw new Error("unrecognized user");
        }
    }   
    catch(error){next(error)};
}
