import {GraphQLList} from "graphql";
import {ComplaintSubjectType} from "../Types/index.js";
import {Complaint} from "../../../../DataBase/index.js";


export default {
    name:"complaintSubjects",
    type:new GraphQLList(ComplaintSubjectType),
    resolve:()=>{
        return Complaint.subjects;
    },
}
