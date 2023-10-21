import DataBase from "../DataBase/index.js";
import {findUserHandler} from "../Handlers/index.js";


export default {
    path:"/language",
    endpoints:[{
        method:"POST",
        handler:[
            (request,response,next)=>{
                response.locals.throws=false;
                next();
            },
            findUserHandler,
            async (request,response)=>{
                const {user}=response.locals;
                const langId=user?request.body.langId:"fr";
                const language=await DataBase.languageCollection.findOne({$id:langId});
                response.json(language);
            },
        ],
    }],
}
