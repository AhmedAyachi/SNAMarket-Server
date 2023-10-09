import {GraphQLList,GraphQLNonNull} from "graphql";
import {GraphQLField} from "graphqlutils";
import OrderItemType from "./OrderItemType.js";
import {OrderType} from "../../Types/index.js";
import {Product} from "../../../../../DataBase/index.js";

export default GraphQLField({
    type:OrderType,
    args:[
        {
            name:"items",
            type:new GraphQLNonNull(new GraphQLList(OrderItemType)),
            resolve:async (items)=>{
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
        const {items}=args,{user}=context;
        const order=await user.placeOrder(items);
        return order;
    },
});
