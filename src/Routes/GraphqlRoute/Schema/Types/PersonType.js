import {GraphQLString} from "graphql";
import {GraphQLObject,GraphQLDate} from "qlboost";


export default GraphQLObject({
    name:"Person",
    fields:()=>({
        name:{type:GraphQLString},
        birthdate:GraphQLDate({
            key:"birthdate",
            required:true,
            prettify:true,
        }),
        countryId:{type:GraphQLString},
    }),
});
