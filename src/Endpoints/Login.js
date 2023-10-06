import DataBase,{Session} from "../DataBase/index.js";
import {Error,getUserHash} from "../Resources/index.js";


export default {
    path:"/login",
    method:"POST",
    handler:async (request,response,next)=>{
        let {username,password,deviceId}=request.body;
        try{
            username=username.trim();
            deviceId=deviceId.trim();
            const hash=getUserHash(username,password);
            const user=await DataBase.userCollection.findOne({hash});//alexhunter7482 ajdkhuf295472ad82
            if(user){
                const {sessions}=user;
                if(sessions?.some(session=>session.deviceId===deviceId)){
                    throw new Error("user has already started a session on this device");
                }
                else{
                    const session=new Session({deviceId});
                    await DataBase.userCollection.updateOne({id:user.id},{$push:{sessions:session}});
                    response.json({sessionId:session.id});
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
};

