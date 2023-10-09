import express from "express";
import bodyParser from "body-parser";
import * as routes from "./routes/index.js";
import DataBase from "./DataBase/index.js";
import {Error} from "./Resources/index.js";


DataBase.connect().then(connection=>{
    const app=express();
    app.use(bodyParser.json());
    !function setAppRoutes(){
        Object.values(routes).forEach(route=>{
            const {path,endpoints}=route;
            endpoints?.forEach(endpoint=>{
                const {handler}=endpoint;
                const method=endpoint.method?.toLowerCase()||"get";
                if(Array.isArray(handler)){app[method](path,...handler)}
                else{app[method](path,handler)};
            });
        });
    }();
    app.use((error,request,response,next)=>{
        if(!error?.message){error=new Error("unknown error")};
        response.status(error.statusCode||400).json({errors:[error]});
    });
    app.listen(4000,()=>{
        console.log("server is up");
    });
}).
catch(error=>{
    console.log(error);
});
