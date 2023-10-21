import DataBase from "../DataBase/index.js";


export default {
    path:"/findProduct",
    endpoints:[{
        method:"POST",
        handler:async (request,response,next)=>{
            const {query}=request.body;
            const products=await DataBase.productCollection.find({
                $or:[
                    {id:{$regex:query}},
                    {name:{$regex:query}},
                    {description:{$regex:query}},
                ],
            }).toArray();
            response.json(products);
        },
    }],
};
