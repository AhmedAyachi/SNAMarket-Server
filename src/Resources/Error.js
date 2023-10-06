

export default class Error {
    constructor(message,statusCode){
        this.key=message?.replace(/ |\,|\.|\;/g,"");
        this.message=message;
        this.statusCode=statusCode||400;
    }
}
