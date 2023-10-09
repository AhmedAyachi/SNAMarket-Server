import Person from "../Person.js";
import Session from "./Session.js";
import Order from "./Order.js";
import Complaint from "./Complaint.js";
import DataBase from "../index.js";
import {removeItem} from "corella";
import {getId,getUserHash} from "../../Resources/index.js";


export default class User extends Person {
    constructor(data={}){
        super(data);
        this.id=data.id;
        this.hash=data.hash;
        this.sessions=data.sessions?.map($=>new Session($));
        this.orders=data.orders?.map($=>new Order($));
        this.complaints=data.complaints?.map($=>new Complaint($));
    }

    async fileComplaint(data){
        const complaint=new Complaint({
            ...data,id:getId(),
            datetime:Date.now(),
        });
        await DataBase.userCollection.updateOne({id:this.id},{$push:{complaints:complaint}});
        return complaint;
    }

    async placeOrder(items){
        const order=new Order({
            id:getId(),datetime:Date.now(),
            statusCode:"p",items,
        });
        await DataBase.userCollection.updateOne({id:this.id},{$push:{orders:order}});
        return order;
    }

    async addSession(deviceId){
        let session=null;
        const {sessions}=this;
        if(!sessions?.some(session=>session.deviceId===deviceId)){
            session=new Session({
                id:getId(),deviceId,
                birthDateTime:Date.now(),
            });
            await DataBase.userCollection.updateOne({id:this.id},{$push:{sessions:session}});   
        }
        return session;
    }

    async terminateSession(sessionId,withLogOut){
        const {sessions}=this;
        const session=removeItem(sessions,({id})=>id===sessionId);
        if(session){
            session.terminate(withLogOut);
            await DataBase.userCollection.updateOne({id:this.id},{
                $set:{sessions},
                $push:{oldSessions:session},
            });   
        }
        return session;
    }

    static async findByCredentials(username,password){
        let user=null;
        if(username&&password){
            const hash=getUserHash(username,password);
            user=await DataBase.userCollection.findOne({hash});//alexhunter7482 ajdkhuf295472ad82
            if(user){user=new User(user)};
        }
        return user;
    }

    static async findByIds(userId,sessionId){
        let user=null;
        if(userId&&sessionId){
            user=await DataBase.userCollection.findOne({id:userId,"sessions.id":sessionId});
            if(user){user=new User(user)};
        }
        return user;
    }
}
