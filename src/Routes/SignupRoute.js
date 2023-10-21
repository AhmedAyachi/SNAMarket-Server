import {isEmail} from "vritra";
import GraphQLUtils from "graphqlutils";
import DataBase,{User} from "../DataBase/index.js";


export default {
    path:"/signup",
    endpoints:[{
        method:"POST",
        handler:async (request,response,next)=>{
            try{
                const {userdata}=request.body,data={};
                for(const key in validator){
                    let value=userdata[key];
                    value=await validator[key]?.(value,userdata,data);
                    if(value){data[key]=value}
                    else{
                        throw new Error(`invalid ${key}`);
                    }
                }
                //const user=await User.add(data);
                response.json({
                    email:data.email,
                    password:data.password,
                });
            }
            catch(error){next(error)};
        },
    }],
};

const validator={
    name:(value)=>{
        if(typeof(value)==="string"){
            value=value.trim();
            return value.length&&value.toLowerCase();
        }
    },
    email:async (value)=>{
        if(typeof(value)==="string"){
            value=value.trim();
            if(isEmail(value)){
                const exists=await User.emailExists(value);
                if(exists){throw new Error("email already used")};
                return value;
            }
        }
    },
    /* username:async (value="")=>{
        value=value?.trim();
        if((!value)||(value.length<10)){throw new Error("username should be at least 10-character long")};
        const exists=await DataBase.userCollection.countDocuments({username:value})>0;
        if(exists){throw new Error("username already exists")};
        return value;
    }, */
    password:(value="")=>{
        if(!User.isValidPassword(value)){
            throw new Error("password should be at least 10-character long containing at least one uppercase and one digit");
        }
        return value;
    },
    birthdate:(value="")=>{
        try{
            value=GraphQLUtils.GraphQLDate({
                srcType:"string",
                srcFormat:"dmy",
                prettify:false,
            }).resolve(value);
        }
        catch(error){
            throw new Error(error.message);
        }
        return value;
    },
    countryId:(value="",userdata,data)=>{
        value=value?.trim();
        if(value){
            const country=User.countries.find(({id})=>id===value);
            if(country){
                let {tel}=userdata;
                if(typeof(tel)==="string"){
                    tel=tel.trim();
                    const {telDigitRange}=country,{length}=tel;
                    let min,max;
                    if(Array.isArray(telDigitRange)){[min,max]=telDigitRange}
                    else{min=max=telDigitRange}; 
                    if((length<min)||(max&&(max<length))){
                        throw new Error("invalid country phone number length");
                    }
                    data.tel=tel;
                }
            }
            else{
                throw new Error("invalid countryId");
            }
            return value;
        }
    },
}
