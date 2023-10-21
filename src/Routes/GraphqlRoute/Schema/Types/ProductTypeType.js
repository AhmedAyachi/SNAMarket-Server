import {GraphQLList,GraphQLID} from "graphql";
import {GraphQLObject} from "graphqlutils";
import BrandType from "./BrandType.js";


export default GraphQLObject({
    name:"ProductType",
    fields:{
        id:{type:GraphQLID},
        brands:{type:new GraphQLList(BrandType)},
    },
});
