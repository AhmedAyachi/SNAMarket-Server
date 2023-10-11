import {User} from "../DataBase/index.js";
//import {Error} from "../Resources/index.js";


export default {
    path:"/login",
    endpoints:[{
        method:"POST",
        handler:async (request,response,next)=>{
            let {email,password,deviceId}=request.body;
            try{
                email=email.trim();
                deviceId=deviceId.trim();
                const user=await User.findByCredentials(email,password);
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
                    throw new Error("user not found");
                }
            }
            catch(error){
                next(error);
            }
        },
    }],
};

