import {graphqlHTTP} from "express-graphql";
import Schema from "./Schema/Schema.js";
import {findUserHandler} from "../../Handlers/index.js";
import {Error} from "../../Resources/index.js"


export default {
    path:"/graphql",
    endpoints:[{
        method:"use",
        handler:[
            findUserHandler,
            (request,response,next)=>graphqlHTTP({
                schema:Schema,
                graphiql:true,
                context:response.locals,
                customFormatErrorFn:(error)=>new Error(error.message),
            })(request,response),
        ],
    }],
}
