import {graphqlHTTP} from "express-graphql";
import Schema from "./Schema/Schema.js";
import {findUserHandler} from "../../Handlers/index.js";


export default {
    path:"/graphql",
    method:"use",
    handler:[
        //findUserHandler,
        graphqlHTTP({
            schema:Schema,
            graphiql:true,
        }),
    ],
}
