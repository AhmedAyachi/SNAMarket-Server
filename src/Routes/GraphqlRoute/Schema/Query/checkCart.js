import {GraphQLBoolean,GraphQLList,GraphQLNonNull} from "graphql";
import {OrderItemType} from "../Types/index.js";
import {Product} from "../../../../DataBase/index.js";


export default {
    type:GraphQLBoolean,
    args:[
        {
            name:"items",
            type:new GraphQLNonNull(new GraphQLList(OrderItemType.toArgType())),
            resolve:async (items)=>{
                if(items.some(item=>!units.includes(item.unit))){
                    throw new Error(`unit is not in ${JSON.stringify(units)}`);
                }
                const productIds=items.map(({productId})=>productId);
                if(productIds.length===new Set(productIds).size){
                    const products=await Product.findByIds(productIds);
                    items.forEach(({productId,granularity})=>{
                        const {granularities}=products.find(({id})=>id===productId);
                        if(!granularities.includes(granularity)){
                            throw new Error("invalid granularity value");
                        }
                    });
                }
                else{
                    throw new Error("duplicate found");
                }
                return items;
            },
        }
    ],
    resolve:async (parent,args,context,info)=>{
        const {items}=args;
        return true;
    },
};

const units=["kg","t"];
