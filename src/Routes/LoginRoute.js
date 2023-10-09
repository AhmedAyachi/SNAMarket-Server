import {User} from "../DataBase/index.js";
import {Error} from "../Resources/index.js";


export default {
    path:"/login",
    endpoints:[{
        method:"POST",
        handler:async (request,response,next)=>{
            let {username,password,deviceId}=request.body;
            try{
                username=username.trim();
                deviceId=deviceId.trim();
                const user=await User.findByCredentials(username,password);
                if(user){
                    const session=await user.addSession(deviceId);
                    if(session){
                        response.json({sessionId:session.id});
                    }
                    else{
                        throw new Error("user has already started a session on this device");
                    }
                }
                else{
                    throw new Error("");
                }
            }
            catch(error){
                next(error);
            }
        },
    }],
};

