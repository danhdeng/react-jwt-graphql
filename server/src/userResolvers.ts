import {Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware} from "type-graphql";
import {hash, compare} from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { isAuth } from "./isAuth";

@ObjectType()
class LoginResponse{
    @Field()
    accessToken: string
}


@Resolver()
export class UserResolvers {
    @Query(()=>String)
    hello () {
        return "hi form UserResolvers";
    }

    @Query(()=>String)
    @UseMiddleware(isAuth)
    bye (@Ctx() {payload}:MyContext) {
        return `your use id is ${payload!.userId}`
    }

    @Query(()=>[User])
    users () {
        return User.find();
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
            res.cookie("jid", createRefreshToken(user),{
                    httpOnly: true,
            });
            return {
                accessToken: createAccessToken(user),
            };
    }
}

