import express from "express";
import {graphqlHTTP} from "express-graphql";
import Schema from "./Schema/Schema.js";
import mongoose from "mongoose";


mongoose.set("strictQuery",true);
mongoose.connect("mongodb://localhost:27017/SNAMarket");
mongoose.connection.once("open",()=>{
    console.log("connected to database");
    const app=express();
    app.use("/graphql",graphqlHTTP({
        schema:Schema,
        graphiql:true,
    }));
    app.listen(4000,()=>{
        console.log("server is up");
    });
});
/* app.get("/",(request,response)=>{
    response.send("this is a server response message");
}); */


