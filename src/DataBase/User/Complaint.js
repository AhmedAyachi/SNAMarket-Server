

export default class Complaint {
    constructor(data={}){
        this.id=data.id;
        this.subject=data.subject;
        this.datetime=data.datetime;
        this.orderId=data.orderId;
        this.body=data.body;
    }

    static subjects=[
        {id:"pd",name:"product"},
        {id:"cs",name:"customerservice"},
        {id:"dlv",name:"delivery"},
    ]
}
