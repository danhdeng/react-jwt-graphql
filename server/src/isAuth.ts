import jwt from "jsonwebtoken";
import { MyContext } from "./MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext>=({context}, next)=>{
    let token;
    if(context.req.headers.authorization && context.req.headers.authorization.startsWith("Bearer")){
        token=context.req.headers.authorization.split(" ")[1];
    }
    if(!token){
        throw new Error("not authenticated");
    }

    try{
        const payload=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload=payload as any;
    }
    catch(err){
        console.log("error:", err);
        throw new Error("not authenticated");
    }
    return next();
}