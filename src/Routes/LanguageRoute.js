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
                const language=langId&&await DataBase.languageCollection.findOne({_code:langId},{_id:0});
                response.json(language);
            },
        ],
    }],
}
