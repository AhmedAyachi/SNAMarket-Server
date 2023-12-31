import {MongoClient} from "mongodb";


export * from "./User/index.js";
export {default as Product} from "./Product.js";


const DataBase={
    connect:()=>fetch(DB_URL,{method:"POST"}).
    then(response=>response.json()).
    then(data=>{
        const {status}=data;
        if(status==="ready"){
            console.log("connected to database"); 
        }
        else throw Error("unable to connect to DataBase Server.");
        return DataBase;
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