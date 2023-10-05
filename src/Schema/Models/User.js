import {model,Schema} from "mongoose";


const OrderModel=new Schema({
    id:String,
    date:String,
    time:String,
    statusCode:String,
}),complaintModel=new Schema({
    id:String,
    date:String,
    time:String,
    subject:String,
    body:String,
});

const collection="Users";
export default new model(collection,Schema({
    id:String,
    username:String,
    hash:String,
    name:String,
    birthdate:String,
    countryId:String,
    orders:[OrderModel],
    complaints:[complaintModel],
},{collection}));
