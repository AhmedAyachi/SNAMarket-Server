import {GraphQLSchema} from "graphql";
import Query from "./Query/Query.js";
import Mutation from "./Mutation/Mutation.js";


export default new GraphQLSchema({
    query:Query,
    mutation:Mutation,
});