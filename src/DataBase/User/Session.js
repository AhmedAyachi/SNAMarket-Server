import {getTotime,getTodate,getId} from "../../Resources/index.js";


export default class Session {
    constructor(data={}){
        this.id=data.id;
        this.deviceId=data.deviceId;
        this.birthDateTime=data.birthDateTime;
    }

    terminate(withLogOut){
        if(withLogOut){this.terminated=true};
        this.expiryDateTime=Date.now();
    }

}
