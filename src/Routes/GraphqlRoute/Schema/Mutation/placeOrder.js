import {OrderType} from "../Types/index.js";
import IsValidCartField from "../Query/IsValidCartField.js";


export default {
    type:OrderType,
    args:IsValidCartField.args,
    resolve:async (parent,args,context,info)=>{
        const {items}=args,{user}=context;
        const order=items&&await user.placeOrder(items);
        return order;
    },
};
