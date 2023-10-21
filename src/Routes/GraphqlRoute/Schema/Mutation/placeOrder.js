import {OrderType} from "../Types/index.js";
import checkCart from "../Query/checkCart.js";


export default {
    type:OrderType,
    args:checkCart.args,
    resolve:async (parent,args,context,info)=>{
        const {items}=args,{user}=context;
        const order=await user.placeOrder(items);
        return order;
    },
};
