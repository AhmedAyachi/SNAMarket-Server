import {MongoClient} from "mongodb";


export {default as Session} from "./Session.js";

const DataBase={
    connect:()=>MongoClient.connect("mongodb://localhost:27017/SNAMarket").
    then(client=>{
        DataBase.connection=client.db();
        console.log("connected to database");
        return DataBase.connection;
    }).
    catch(error=>{
        console.log(error);
        return Promise.reject(error);
    }),
    connection:null,
    get userCollection(){
        return DataBase.connection.collection("Users");
    },
};
export default DataBase;