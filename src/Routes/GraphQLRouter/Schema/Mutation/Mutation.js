import {GraphQLObject} from "qlboost";
import placeOrder from "./placeOrder.js";
import fileComplaint from "./fileComplaint.js";


export default GraphQLObject({
    name:"Mutator",
    fields:()=>({
        placeOrder,fileComplaint,
    }),
});
