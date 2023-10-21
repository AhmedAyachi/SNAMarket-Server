import {User} from "../DataBase/index.js";
import {Error} from "../Resources/index.js";


export const findUserHandler=async (request,response,next)=>{
    const {throws=true}=response.locals;
    const {userId,sessionId}=request.cookies;
    try{
        const user=await User.findByIds(userId,sessionId);
        if(user){
            response.locals.user=user;
            response.locals.sessionId=sessionId;
            next();
        }
        else if(throws){
            throw new Error("unrecognized user");
        }
        else{
            response.locals.user=null;
            response.locals.sessionId=null;
            next();
        }
    }   
    catch(error){next(error)};
}
