import {GraphQLObject} from "graphqlutils";
import {ComplaintType,OrderType} from "../Types/index.js";
import UserField from "./UserField.js";
import LazyDataField from "./LazyDataField.js";
import IsValidCartField from "./IsValidCartField.js";
import OrderField from "./OrderField.js";
import FindOrderField from "./FindOrderField.js";
import FindComplaintField from "./FindComplaintField.js";
import ComplaintSubjectsField from "./ComplaintSubjectsField.js";
import LangsField from "./LangsField.js";
import FindProductsField from "./FindProductsField.js";


export default GraphQLObject({
    name:"Querier",
    fields:[
        FindProductsField,
        LangsField,
        ComplaintSubjectsField,
        FindComplaintField,
        FindOrderField,
        IsValidCartField,
        OrderField,
        UserField,
        LazyDataField("orders",OrderType),
        LazyDataField("complaints",ComplaintType),
    ],
});
