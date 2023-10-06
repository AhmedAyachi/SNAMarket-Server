import {removeItem} from "corella";
import DataBase from "../DataBase/index.js";
import {findUserHandler} from "../Handlers/index.js";


export default {
    path:"/logout",
    method:"POST",
    handler:[
        findUserHandler,
        async (request,response,next)=>{
            const {user,sessionId}=response.locals;
            const {sessions}=user;
            const oldSession=removeItem(sessions,({id})=>id===sessionId);
            oldSession.terminated=true;
            oldSession.expiryDateTime=Date.now();
            await DataBase.userCollection.updateOne({id:user.id},{
                $set:{sessions},
                $push:{oldSessions:oldSession},
            });
            response.json({ok:1});
        },
    ],
};

