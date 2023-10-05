import {GraphQLObjectType,GraphQLString,GraphQLID} from "graphql";


export default new GraphQLObjectType({
    name:"Complaint",
    fields:()=>({  
        id:{type:GraphQLID},
        date:{type:GraphQLString},
        time:{type:GraphQLString},
        subject:{type:GraphQLString},
        body:{type:GraphQLString},
    }),
});
