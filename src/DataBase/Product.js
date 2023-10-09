import DataBase from "./index.js";



export default class Product {
    constructor(data={}){
        this.id=data.id;
        this.granularities=data.granularities; 
    }

    static async findByIds(productIds){
        let products;
        if(productIds){
            products=await DataBase.productCollection.find({id:{$in:productIds}}).toArray();
            if(products){
                products=products.map($=>new Product($));
            };
        }
        return products;
    }
}
