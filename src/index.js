import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as routes from "./Routes/index.js";
import DataBase from "./DataBase/index.js";
import {Error} from "./Resources/index.js";


DataBase.connect().then(connection=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use("/public",express.static("public",{}));
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
        error=new Error(error?.message||"unknown error",error.code);
        response.status(error.statusCode).json({errors:[error]});
    });
    app.listen(4000,()=>{
        console.log("server is up");
    });
}).
catch(error=>{
    console.log(error);
});
