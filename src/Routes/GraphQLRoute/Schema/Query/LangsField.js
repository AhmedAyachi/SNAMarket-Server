import {GraphQLList} from "graphql";
import {LangType} from "../Types/index.js";
import DataBase from "../../../../DataBase/index.js";


export default {
    name:"langs",
    type:new GraphQLList(LangType),
    resolve:async ()=>{
        const langs=await DataBase.languageCollection.find({}).project({_id:0,_code:1,_name:1}).toArray();
        return langs;
    },
}
