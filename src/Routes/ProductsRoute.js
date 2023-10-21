import DataBase from "../DataBase/index.js";
import {Error} from "../Resources/index.js";


export default {
    path:"/products/",
    endpoints:[{
        method:"POST",
        handler:async (request,response,next)=>{
            const {brandId,type}=request.body;
            const brand=await DataBase.brandCollection.findOne({id:brandId});
            if(brand){
                const {productIds}=brand;
                const products=await DataBase.productCollection.find({id:{$in:productIds},type},{limit:productIds.length}).toArray();
                response.json(products);
            }
            else{
                next(new Error("brand not found"));
            }
        },
    }],
};
