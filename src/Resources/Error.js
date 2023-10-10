

export default class Error {
    constructor(message,statusCode){
        this.key=message?.replace(/ |\,|\.|\;/g,"").toLowerCase();
        this.message=message;
        this.statusCode=statusCode||400;
    }
}
