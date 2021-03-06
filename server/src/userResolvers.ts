import {Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware} from "type-graphql";
import {hash, compare} from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { isAuth } from "./isAuth";
import { sendRefreshToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse{
    @Field()
    accessToken: string;

    @Field(()=>User)
    user: User;
}


@Resolver()
export class UserResolvers {
    @Query(()=>String)
    hello () {
        return "hi form UserResolvers";
    }

    @Query(()=>String)
    @UseMiddleware(isAuth)
    accessWithToken (@Ctx() {payload}:MyContext) {
        return `your use id is ${payload!.userId}`
    }

    @Query(()=>[User])
    async users () {
        return await User.find();
    }

    @Query(()=>User, {nullable: true})
    async me (@Ctx() context: MyContext
    ) {
        let token;
        if(context.req.headers.authorization && context.req.headers.authorization.startsWith("bearer")){
            token=context.req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return null;
       }
    
        try{
            const payload: any=verify(token, process.env.ACCESS_TOKEN_SECRET!);
            return await User.findOne(payload.userId);
        }
        catch(err){
            console.log("error:", err);
            return null;
        }
        return null;
    }


    @Mutation(()=>Boolean)
    async revokeRefreshTokenForUser(
        @Arg('userId', ()=>Int) userId: number,
    ){
       await getConnection().getRepository(User).increment({id: userId}, "tokenVersion",1);
        return true;
    }

    @Mutation(()=>Boolean)
    async logout(@Ctx() {res}: MyContext
    ) {
        sendRefreshToken(res,"");
        return true;
    }

    @Mutation(()=>Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ){
        try{
            const hashPassword=await hash(password, 12);
            await User.insert({
                email,
                password: hashPassword,
            })
        }catch(error){
            console.log(error);
            return false;
        }
        return true;
    }

    @Mutation(()=>LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}:MyContext,
    ) : Promise<LoginResponse>{
        // try{
            const user=await User.findOne({where: {email}});
            if(!user){
                throw new Error("Could not find user");
            }
            const validPassword=await compare(password, user.password);
            if(!validPassword){
                throw new Error("bad password");
            }
            sendRefreshToken(res,createRefreshToken(user));
            // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
            //res.cookie("jid", createRefreshToken(user), { expires: new Date(Date.now() + 900000), httpOnly: true });
            return {
                accessToken: createAccessToken(user), user
            };
    }
}

