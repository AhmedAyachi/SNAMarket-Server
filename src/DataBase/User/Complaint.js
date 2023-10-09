

export default class Complaint {
    constructor(data={}){
        this.id=data.id;
        this.subject=data.subject;
        this.datetime=data.datetime;
        this.body=data.body;
        this.orderId=data.orderId;
    }

    static subjects=[
        {id:"pd",name:"product"},
        {id:"cs",name:"customerService"},
        {id:"dlv",name:"delivery"},
    ]
}
