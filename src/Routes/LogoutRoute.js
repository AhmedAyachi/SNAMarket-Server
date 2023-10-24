import {findUserHandler} from "../Handlers/index.js";


export default {
    path:"/logout",
    endpoints:[{
        method:"POST",
        handler:[
            findUserHandler,
            async (request,response,next)=>{
                const {user,sessionId}=response.locals;
                const session=await user.terminateSession(sessionId,true);
                if(session){
                    response.json({ok:1});
                }
                else{
                    throw new Error("could not terminate session");
                }
            },
        ],
    }],
};

