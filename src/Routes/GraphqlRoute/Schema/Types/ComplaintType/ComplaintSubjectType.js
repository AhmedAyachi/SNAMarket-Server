import {GraphQLID,GraphQLString} from "graphql";
import {GraphQLObject} from "graphqlutils";


export default GraphQLObject({
    name:"ComplaintSubject",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
    }),
});
