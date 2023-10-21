import sha256 from "sha256";


export {default as Error} from "./Error.js";
export const MailJetAPIKey="536bd897fa8903f1f26d26be9c4009bc";

export const getId=()=>Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
export const getHash=(value)=>sha256(sha256(value));
export const getUserHash=(email,password)=>getHash(email+password);

export const getTodate=()=>{
    const date=new Date(Date.now());
    return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
}

export const getTotime=()=>{
    const date=new Date(Date.now());
    return date.getHours()+":"+date.getMinutes();
}
