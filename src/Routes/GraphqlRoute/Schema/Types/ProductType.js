import {GraphQLList, GraphQLString} from "graphql";
import {GraphQLObject} from "graphqlutils";


export default GraphQLObject({
    name:"Product",
    fields:[
        {name:"id",type:GraphQLString},
        {name:"name",type:GraphQLString},
        {name:"type",type:GraphQLString},
        {name:"description",type:GraphQLString},
        {
            name:"granularities",
            type:new GraphQLList(GraphQLString),
        },
    ],
});
