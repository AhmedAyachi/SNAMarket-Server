import {groupBy} from "vritra";
import DataBase,{Product} from "../DataBase/index.js";


export default {
    path:"/producttypes",
    endpoints:[{
        method:"GET",
        handler:async (request,response)=>{
            const producttypes=await DataBase.producttypesCollection.find({}).toArray();
            const brands=await DataBase.brandCollection.find({}).toArray();
            producttypes.forEach(producttype=>{
                producttype.brands=[];
            });
            brands.forEach(brand=>{
                delete brand._id;
                delete brand.productIds;
                producttypes.forEach(producttype=>{
                    const {brandIds,brands}=producttype; 
                    if(brandIds.includes(brand.id)){
                        brands.push(brand);
                    }
                });
            });
            producttypes.forEach(producttype=>{
                delete producttype._id;
                delete producttype.brandIds;
            });
            response.json(producttypes);
        },
    }],
};
