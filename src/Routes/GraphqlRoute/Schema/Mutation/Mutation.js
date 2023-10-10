import {GraphQLObject} from "graphqlutils";
import placeOrder from "./placeOrder/placeOrder.js";
import fileComplaint from "./fileComplaint.js";


export default GraphQLObject({
    name:"Mutator",
    fields:()=>({
        placeOrder,fileComplaint,
    }),
});
