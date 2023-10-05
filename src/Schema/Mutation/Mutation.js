import {GraphQLObjectType} from "graphql";
import SignupField from "./SignupField.js";


export default new GraphQLObjectType({
    name:"Mutator",
    fields:()=>({
        signup:SignupField,
    }),
});
