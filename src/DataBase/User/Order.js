import DataBase from "../../DataBase/index.js";


export default class Order {
    constructor(data={}){
        this.id=data.id;
        this.datetime=data.datetime;
        this.statusCode=data.statusCode;
        this.items=data.items;
    }
}
