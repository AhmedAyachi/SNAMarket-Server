import {MongoClient} from "mongodb";


export * from "./User/index.js";
export {default as Product} from "./Product.js";

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
    get brandCollection(){
        return DataBase.connection.collection("Brands");
    },
    get productCollection(){
        return DataBase.connection.collection("Products");
    },
    get userCollection(){
        return DataBase.connection.collection("Users");
    },
};
export default DataBase;