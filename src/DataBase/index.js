import {MongoClient} from "mongodb";
import * as data from "./Data/index.js";
import {capitalize} from "vritra";


export * from "./User/index.js";
export {default as Product} from "./Product.js";

const DataBase={
    name:"SNAMarket",
    connect:()=>MongoClient.connect("mongodb://db-container:27017").
    then(async (client)=>{
        let connection=client.db(DataBase.name);
        await connection.dropDatabase();
        connection=DataBase.connection=client.db(DataBase.name);
        console.log("database reset successfully");
        for(const key in data){
            const collectionName=capitalize(key);
            console.log(`creating ${collectionName} collection`);
            const collection=await connection.createCollection(collectionName);
            await collection.insertMany(data[key]);
        }
        return DataBase.connection;
    }).
    catch(error=>{
        console.log(error);
        return Promise.reject(error);
    }),
    connection:null,
    get producttypesCollection(){
        return DataBase.connection.collection("ProductTypes");
    },
    get languageCollection(){
        return DataBase.connection.collection("Languages");
    },
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