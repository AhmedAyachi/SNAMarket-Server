import {getTotime,getTodate,getId} from "../Resources/index.js";


export default class Session {
    constructor(props={}){
        Object.assign(this,{
            id:getId(),
            deviceId:props.deviceId,
            birthDateTime:Date.now(),
        });
    }
}
