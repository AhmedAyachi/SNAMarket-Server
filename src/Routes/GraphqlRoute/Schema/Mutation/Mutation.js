import {GraphQLObjectType} from "graphql";
import placeOrder from "./placeOrder/placeOrder.js";
import fileComplaint from "./fileComplaint.js";


export default new GraphQLObjectType({
    name:"Mutator",
    fields:()=>({
        placeOrder,fileComplaint,
    }),
});
