import {GraphQLList,GraphQLNonNull} from "graphql";
import {OrderItemType,OrderType} from "../Types/index.js";
import {Product} from "../../../../DataBase/index.js";


export default {
    type:OrderType,
    args:[
        {
            name:"items",
            type:new GraphQLNonNull(new GraphQLList(OrderItemType.toArgType())),
            resolve:async (items)=>{
                let isvalid=items.length&&items.every(item=>units.includes(item.unit));
                if(isvalid){
                    const productIds=items.map(({ref})=>ref);
                    if(productIds.length===new Set(productIds).size){
                        const products=await Product.findByIds(productIds),{length}=products;
                        let i=0;
                        while(isvalid&&(i<length)){
                            const {ref,granularity}=items[i];
                            const product=products.find(({id})=>id===ref),{granularities}=product;
                            if(granularities.includes(granularity)){
                                items[i].product=product;
                            }
                            else{
                                isvalid=false;
                            }
                            i++;
                        }
                    }
                    else{
                        isvalid=false;
                    }
                }
                return isvalid&&items;
            },
        }
    ],
    resolve:async (parent,args,context,info)=>{
        const {items}=args;
        const order=items&&{};
        if(order){
            order.items=items.map(({product,granularity,unit,quantity})=>({
                ref:product.id,
                name:product.name,
                granularity,unit,quantity,
            }));
        }
        return order;
    },
};

const units=["kg","t"];
